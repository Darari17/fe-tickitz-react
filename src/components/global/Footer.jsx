export const Footer = () => {
  return (
    <footer className="flex flex-col justify-center items-center px-6 lg:px-12 py-10">
      <section className="flex flex-col lg:flex-row justify-center items-start bg-white w-full gap-10 ">
        <div className="flex flex-col flex-1 gap-5">
          <div>
            <img src={"/logos/footer-logo-2.svg"} alt="Footer Logo" />
          </div>
          <div className="text-balance">
            Stop waiting in line. Buy tickets conveniently, watch movies
            quietly.
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-3">
          <div>Explore</div>
          <div>Cinemas</div>
          <div>Movie List</div>
          <div>My Ticket</div>
          <div>Notification</div>
        </div>

        <div className="flex-1 flex flex-col gap-5">
          <div>Our Sponsor</div>
          <div>
            <img src={"/logos/ebv-id-logo.svg"} alt="ebv.id" />
          </div>
          <div>
            <img src={"/logos/cineone-21-logo.svg"} alt="CineOne 21" />
          </div>
          <div>
            <img src={"/logos/hiflix-logo.svg"} alt="hiflix" />
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-5">
          <div>Follow us</div>

          <div className="flex gap-3">
            <div>
              <img src={"/logos/facebook-logo-outline.svg"} alt="Facebook" />
            </div>
            <div>Tickitz Cinema id</div>
          </div>

          <div className="flex gap-3">
            <div>
              <img src={"/logos/instagram-logo-outline.svg"} alt="Instagram" />
            </div>
            <div>tickitz.id</div>
          </div>

          <div className="flex gap-3">
            <div>
              <img src={"/logos/twitter-logo-outline.svg"} alt="Twitter" />
            </div>
            <div>tickitz.id</div>
          </div>

          <div className="flex gap-3">
            <div>
              <img src={"/logos/youtube-logo-outline.svg"} alt="Youtube" />
            </div>
            <div>Tickitz Cinema id</div>
          </div>
        </div>
      </section>

      <section className="mt-10 flex justify-start w-full lg:justify-center">
        <div>© 2020 Tickitz. All Rights Reserved.</div>
      </section>
    </footer>
  );
};
