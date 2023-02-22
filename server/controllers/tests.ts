import express, {Express, Request, Response} from 'express'
import User from '../models/User.js'
import { dbConnect } from '../models/index.js'
import { middleware } from './middleware.js'
import jwt from 'jsonwebtoken'
dbConnect()
const router = express.Router()
declare var process : {
    env : {
        JWT_SECRET: string
    }
} 
router.get('/:id',middleware,async(req:Request,res:Response)=>{
    try{
        const foundUser = await User.findById(res.locals.user._id)
        if(!foundUser) throw new Error('user not found')
        const testId:string = req.params.id

        let index
        const findTest = foundUser.tests.filter((test:any, idx:number)=>{
            if(test._id==req.params.id) {
                index =idx
                return idx
            }
        })
        let percentage
        if(index!=0 && index!= undefined){
            const currentTest:any =foundUser.tests[index]
            const oldTest:any = foundUser.tests[index-1]
            if(oldTest?.wpm != currentTest.wpm){
                percentage =(((currentTest.wpm-oldTest.wpm )/Math.abs(oldTest.wpm))*100).toFixed(2)
            }else{
                percentage = 0
            }
            console.log(percentage)
        }else if (index!= undefined){
            const currentTest:any =foundUser.tests[index]
            console.log(currentTest.wpm)
            percentage =(((currentTest.wpm-0 )/Math.abs(0))*100).toFixed(2)
        }
        console.log(percentage)

    }catch(err){
        res.status(500).json({message:'My bad'})
    }
})


router.post('/',middleware,async(req:Request, res: Response)=>{
    try{
        const foundUser = await User.findById(res.locals.user._id)
        if(!foundUser) throw new Error('user not found')
        const wpm:number = req.body.wpm
        const mistakes = req.body.mistakes
        const payload={
            wpm,
            mistakes
        }
        // adding new test to assigned user
        foundUser.tests.push(payload)
        await foundUser.save()
        if (res.locals.user.wpm < wpm){
            // if new test has an improved wpm update the user's wpm field 
           const updateWPM= await User.findByIdAndUpdate(res.locals.user.id,{wpm: wpm})
            res.json({updateWPM})
        }else{
            res.json({foundUser})
        }
        // {
        //     "id": "63e8229205216e93bca9ab65",
        //      "wpm": 30,
        //      "mistakes":[
        //        {
        //          "char": "t",
        //          "amount": 5
        //        },
        //        {
        //          "char":"e",
        //          "amount": 7
        //        }
        //        ]
        //    }
    }catch(err:any){
        res.status(500).json({message:'My bad'})
    }
})






export default router