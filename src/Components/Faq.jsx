

const Faq = () => {
    return (
        <div className="" >
            <div className="max-w-5xl mx-auto space-y-5 p-6 m-4" >
                <h3 className="font-semibold text-2xl text-center" >FAQs</h3>
                <div>
                    <div className="join join-vertical w-full">
                      <div className="collapse collapse-arrow join-item border-base-300 border">
                        <input type="radio" name="my-accordion-4" defaultChecked />
                        <div className="collapse-title text-xl font-medium">Why should I leave a review?</div>
                        <div className="collapse-content">
                          <p>Your feedback helps others make informed decisions and allows service providers to improve their offerings.</p>
                        </div>
                      </div>
                      <div className="collapse collapse-arrow join-item border-base-300 border">
                        <input type="radio" name="my-accordion-4" />
                        <div className="collapse-title text-xl font-medium">How do I sign up for the platform?</div>
                        <div className="collapse-content">
                          <p>Click on the Sign Up button and provide your email and password. You can also sign up using Google or Facebook.</p>
                        </div>
                      </div>
                      <div className="collapse collapse-arrow join-item border-base-300 border">
                        <input type="radio" name="my-accordion-4" />
                        <div className="collapse-title text-xl font-medium">How do I edit my account details?</div>
                        <div className="collapse-content">
                          <p>Navigate to your profile page and click Edit Profile to update your information.</p>
                        </div>
                      </div>
                      <div className="collapse collapse-arrow join-item border-base-300 border">
                        <input type="radio" name="my-accordion-4" />
                        <div className="collapse-title text-xl font-medium">What should I do if I forget my password?</div>
                        <div className="collapse-content">
                          <p>Use the Forgot Password option on the login page to reset it.</p>
                        </div>
                      </div>
                      <div className="collapse collapse-arrow join-item border-base-300 border">
                        <input type="radio" name="my-accordion-4" />
                        <div className="collapse-title text-xl font-medium">How do I write a review?</div>
                        <div className="collapse-content">
                          <p>Select the service you want to review, click Write Review, and submit your feedback along with a rating.</p>
                        </div>
                      </div>
                      <div className="collapse collapse-arrow join-item border-base-300 border">
                        <input type="radio" name="my-accordion-4" />
                        <div className="collapse-title text-xl font-medium">Can I edit my review after submitting it?</div>
                        <div className="collapse-content">
                          <p>Yes, you can edit your review by clicking the Edit button on your review in the My Reviews section.</p>
                        </div>
                      </div>
                      <div className="collapse collapse-arrow join-item border-base-300 border">
                        <input type="radio" name="my-accordion-4" />
                        <div className="collapse-title text-xl font-medium">Why is my review not appearing?</div>
                        <div className="collapse-content">
                          <p>Reviews may take a few minutes to be processed or could be pending moderation.</p>
                        </div>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Faq;