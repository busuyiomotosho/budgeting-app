import { Form } from "react-router-dom";
import illustration from "../assets/investing.svg";
import { BanknotesIcon, UserPlusIcon } from "@heroicons/react/24/solid";

const Intro = () => {
  return (
    <div className="intro">
      <div>
        <h1>
          Control Your <span className="accent">Finances</span>
        </h1>
        <p>Budgeting Made Beautifully Simple.</p>
        <Form method="post">
          <input
            type="text"
            name="userName"
            required
            placeholder="What is your name?"
            aria-label="Your name"
            autoComplete="given-name"
          />
          <input type="hidden" name="_action" value="newUser" />
          <button type="submit" className="btn btn--home">
            <span>Get Started</span>
            <BanknotesIcon width={20} />
          </button>
        </Form>
      </div>
      <img
        src={illustration}
        alt="Person with money"
        width={500}
        className="hero"
      />
    </div>
  );
};

export default Intro;
