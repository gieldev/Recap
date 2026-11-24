function PrivacyModal({ active, setActive}) {

  return (
    <>
      <div
        className={`absolute top-0 left-0 h-screen inset-0 flex items-center p-12 ml-0 justify-center bg-black/50 z-3 lg:ml-72 ${active ? "block" : "hidden"}`}
      >
        <div className="w-full h-full bg-neutral-bg rounded-xl overflow-y-auto">
          <div>
            <header className="flex items-center justify-between px-8 py-4">
              <div className="flex flex-col">
                <h1>Privacy Policy for RecallIt</h1>
                <p>Last Updated: November 23, 2026</p>
              </div>

              <svg
                className="lucide lucide-x preview-icon cursor-pointer"
                onClick={() => setActive(!active)}
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </header>
            {/* Contents */}
            <div>
              <ol className="flex flex-col px-8 pb-4 list-decimal">
                {/* What we collect */}
                <li>
                  <h2>What we collect</h2>
                  <ul className="flex flex-col px-8 list-disc">
                    <li>
                      Your name and gmail:{" "}
                      <p>The credentials you used to create an account</p>
                    </li>
                    <li>
                      Files you upload:{" "}
                      <p>
                        The files you upload to automatically generate reviewers
                      </p>
                    </li>
                    <li>
                      Basic usage data:{" "}
                      <p>
                        Your IP address and browser type, collected
                        automatically by our hosting provider
                      </p>
                    </li>
                  </ul>
                </li>
                {/* How we use it */}
                <li>
                  <h2>How we use it</h2>
                  <p className="flex px-8">
                    We use your credentials to create your personal account that
                    contains data related to you. We use your pdf to generate
                    your reviewers. We use usage data to keep the site running
                    and to prevent abuse.
                  </p>
                </li>
                {/* Who we share it with */}
                <li>
                  <h2>Who we share it with</h2>
                  <ul className="flex flex-col px-8 list-disc">
                    <li>
                      Gemini AI:{" "}
                      <p>
                        The text of your PDF is sent to an AI API to generate
                        reviewers
                      </p>
                    </li>
                    <li>
                      Vercel: <p>Processes request and keeps server logs</p>
                    </li>
                  </ul>
                </li>
                {/* How long we keep it */}
                <li>
                  <h2>How long we keep it</h2>
                  <p className="flex px-8">
                    Your account credentials are kept until we terminate
                    inactive accounts. The uploaded PDF are not saved and are
                    only sent to the AI API for generation. Server logs are kept
                    for 1 hour.
                  </p>
                </li>
                {/* Cookies */}
                <li>
                  <h2>Cookies</h2>
                  <p className="flex px-8">
                    We dont use cookies or tracking tools.
                  </p>
                </li>
                {/* Your rights */}
                <li>
                  <h2>Your rights</h2>
                  <p className="flex px-8">
                    You can ask us what data we hold about you, or ask us to
                    delete it, by emailing the address below.
                  </p>
                </li>
                {/* Children */}
                <li>
                  <h2>Children</h2>
                  <p className="flex px-8">
                    RecallIt is not intended for children under 13.
                  </p>
                </li>
                {/* Changes */}
                <li>
                  <h2>Changes</h2>
                  <p className="flex px-8">
                    If we change this policy, we'll update the date above.
                  </p>
                </li>
                {/* Contact */}
                <li>
                  <h2>Contact</h2>
                  <p className="flex px-8">
                    Questions? Email:<a>arg.ducut@gmail.com</a>
                  </p>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PrivacyModal;
