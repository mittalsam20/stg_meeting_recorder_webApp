import "./services.css";

const Services = () => {
  return (
    <>
      <div className="service_div">
        <div className="service_img_div">
          <div className="inner_service" id="services"></div>
          <h1>Our Features</h1>
          <ul>
            <li>
              <h3>
                {" "}
                <span className="orange">RECORDING</span> AUDIO AND VIDEO{" "}
              </h3>
              Core Competence Is Extremely Important In This Dynamic Business
              Enviornment.
              <br />
              We Will Help You Capture Important Information & Data Points
              Without Losing Your Focus
            </li>
            <li>
              <h3>
                TRANSCRIBED <span className="orange">NOTES</span>{" "}
              </h3>
              Accurate Transcribed Notes Of the Audio In Your Hands
            </li>
            <li>
              <h3>
                SLEEK <span className="orange">PRESENTATION</span> OF THE
                MEETING
              </h3>
              Presentation Of Your Meeting In Your Device As Soon As You Leave
              The Meeting
            </li>

            <li>
              <h3>
                THE MEETING IS <span className="orange"> FULL..!!</span>
              </h3>
              We Can Help You Make Your Minutes Of Minutes Consumable Even For
              <br />
              The Ones Not Able To Attend It
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Services;
