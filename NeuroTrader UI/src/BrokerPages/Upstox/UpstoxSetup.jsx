import step1 from "../../Assets/Upstox/step1.png";
import step2 from "../../Assets/Upstox/step2.png";
import step3 from "../../Assets/Upstox/step3.png";
import step4 from "../../Assets/Upstox/step4.png";
import step5 from "../../Assets/Upstox/step5.png";

import "../../App.css"; // Assuming you have a CSS file for styling

const UpstoxSetupGuide = () => {

    return(
<div className="ml_10p mr_10p">
    <header>
      <h1>Upstox  – Setup Guide (Api Secret &  API Key)</h1>
      <p className="fs_20p">Follow this step-by-step guide to obtain your <strong>API Key</strong>, and <strong>Api Secret</strong> for integration.</p>
    </header>

    <section className="card">
      <h2>Prerequisites</h2>
      <ul className="mb_2p fs_20p">
        <li>First, you need a <strong>Demat account with Angel One</strong>. You can create it by downloading the <strong>Angel One</strong> app from the App Store / Play Store.</li>
      </ul>
      <div className="grid">
        <div className="card">
          <p className="fs_30p">What you will need</p>
          <ol className="fs_20p  ">
            <li><strong>Client Code</strong> – Open your Angel One app and in the <em>Portfolio</em> section you’ll find your Client ID.</li>
            <li><strong>PIN</strong> – Your Angel One app login PIN (usually 4 digits).</li>
            <li><strong>API Key</strong> – See <a href="#step-4">Step 4</a> below.</li>
            <li><strong>TOTP</strong> – See <a href="#step-7">Step 7</a> below.</li>
          </ol>
        </div>
        <div className="card">
          <h3 className="fs_30p">Official Sign-Up Link</h3>
          <ul className="fs_20p ">
            <li className="mb_3px">Navigate to Upstox Sign-Up:</li>
            <li className="mb_3px">
              <a href="https://account.upstox.com/developer/apps" target="_blank" rel="noopener noreferrer">
                https://account.upstox.com/developer/apps
              </a>
            </li>
            <li className="mb_3px">Use a desktop browser for the smoothest experience.</li>
          </ul>

        </div>
      </div>
    </section>

    <section className="card mb_2p mt_5p" id="step-1">
      <h2 className="mb_2p">Step 1 – Fill up the sign-up form</h2>
      <div className="img-wrap">
        <img src={step1} alt="Upstox – Step 1 form" width="1080" height="520"  />
      </div>
    </section>

    <section className="card mb_2p mt_5p" id="step-2">
      <h2 className="mb_2p">Step 2 – Create an App</h2>
      <div className="mb_2p fs_20p">After SignUp Please Login and you will this below page and Click on <strong>Create App</strong>.</div>

      <div className="img-wrap">
        <img src={step2} alt="Angel One SmartAPI – Step 2 create app" width="1080" height="520" />
      </div>
    </section>
    <section className="mt_5p" id="step-3">
      <h2 className="mb_2p">Step 3 – App details</h2>
       <ul className="mb_2p fs_20p">
        <li><strong>App Name</strong> – Set it to anything meaningful (e.g., <em>My Trading App</em>).</li>
        <li><strong>Redirect URL</strong> – You can set a placeholder like <code>https://www.google.com</code>.</li>
        <li><strong>Angel Client ID</strong> – Open your Angel One app and in the <em>Portfolio</em> section you will find your Client ID.</li>
      </ul>
      <p className="fs_20p">Click <strong>Create App</strong> to proceed.</p>
      <div className="img-wrap">
        <img src={step3} alt="Angel One SmartAPI – Step 3 app details"  width="1080" height="520" />
-      </div>
     
    </section>

    <section className="mt_5p" id="step-4">
      <h2 className="mb_2p">Step 4 – Get your <span className="pill">API Key</span></h2>
      <div className="fs_20p">Your <strong>API Key</strong> will be visible here. Save it securely.</div>

      <div className="img-wrap">
        <img src={step4} alt="Angel One SmartAPI – Step 4 API key" width="1080" height="520" />
      </div>
    </section>

    <section className="mb_2p mt_5p" id="step-5">
      <h2 className="mb_2p">Step 5 – Enable TOTP</h2>
      <div className="mb_2p">Click on <strong>Enable TOTP</strong> from header</div>

      <div className="img-wrap">
        <img src={step5} alt="Angel One SmartAPI – Step 5 enable TOTP" width="1080" height="520" />
      </div>
    </section>

    <section className="mb_2p mt_5p" id="step-6">
      <h2 className="mb_2p">Step 6 – Verify with Client ID & PIN</h2>
      <ul className="fs_20p mb_2p">
        <li>
          Enter your Angel One <strong>Client ID</strong> and the Angel One app <strong>PIN</strong>.
        </li>
        <li>
          Use the same <strong>Client Code</strong> and <strong>PIN</strong> you use in the Angel One app.
        </li>
    </ul>


    </section>

 

    <section className="card">
      <h2>Now Try to Login and enjoy</h2>     
    </section>

    {/* <footer>
      <p>© Your Project – Angel One SmartAPI Setup Guide</p>
    </footer> */}
  </div>
    );
};

export default UpstoxSetupGuide;
