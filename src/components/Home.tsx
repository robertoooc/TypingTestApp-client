export default function Home() {
  return (
    <div className=" overflow-y-auto">
      <div className="h-20 bg-stone-900 text-white  justify-center flex">
        <h1 className="font-mono text-3xl font-semibold my-auto">
          Typing Test App
        </h1>
      </div>

      <div className="text-center bg-violet-50 h-full  text-lg">
        <div className=" py-5 bg-violet-100">
          <h2 className="text-2xl font-semibold">Typing Test</h2>
          <p className="w-2/3 mx-auto pt-3">
            If you want to quickly test out your typing speed, try our free
            Typing test. You'll be able to see your results and compare them to
            previous tests to see your growth!
          </p>
        </div>

        <div className=" py-5 bg-violet-50">
          <h2 className="text-2xl font-semibold">Google Log In</h2>
          <p className="w-2/3 mx-auto pt-3">
            OAuth will soon be implemented through the form of Google
            Authentication, allowing you to be able to sign up and log in
            through your Google accounts.
          </p>
          <div className=" bg-neutral-900 w-fit mx-auto rounded-md mt-2">
            <h3 className=" text-white text-xl p-2 font-medium">Coming Soon</h3>
          </div>
        </div>

        <div className=" py-5 bg-violet-100">
          <h2 className="text-2xl font-semibold">Typing Test Race</h2>
          <p className="w-2/3 mx-auto pt-3">
            Soon will be using websockets through socket.io to allow you to
            compete against others in live time typing test races. You'll be
            able to see a progession bar representing your pace against others
            taking that same test as you.
          </p>
          <div className=" bg-neutral-900 w-fit mx-auto rounded-md mt-2">
            <h3 className=" text-white text-xl p-2 font-medium">Coming Soon</h3>
          </div>
        </div>

        <div className=" py-5  bg-violet-50">
          <h2 className="text-2xl font-semibold ">Mobile Typing Test</h2>
          <p className="w-2/3 mx-auto pt-3">
            If you want to be able to test your typing speed on a mobile device
            you'll soon be able to do so. No matter if you use your mobile phone
            or your tablet (iPad, etc.) the mobile test will surely suit your
            needs.
          </p>
          <div className=" bg-neutral-900 w-fit mx-auto rounded-md mt-2">
            <h3 className=" text-white text-xl p-2 font-medium">Coming Soon</h3>
          </div>
        </div>

        <div className=" py-5 bg-violet-100 ">
          <h2 className="text-2xl font-semibold">Website Improvements</h2>
          <p className="w-2/3 mx-auto pt-3">
            The primary focus when creating this website was that the users that
            visit it are on some desktop device, so making sure this page was
            media responsive wasn't too much of a priority. This is the first
            major improvement that needs to be done so this page can be visited
            on mobile devices properly.
          </p>
          <div className=" bg-neutral-900 w-fit mx-auto rounded-md mt-2">
            <h3 className=" text-white text-xl p-2 font-medium">Coming Soon</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
