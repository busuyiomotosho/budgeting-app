import { Form, NavLink } from "react-router-dom";
import budgetBuddy from "../assets/budget-buddy.svg";
import { TrashIcon } from "@heroicons/react/24/solid";

const Nav = ({ userName }) => {
  return (
    <nav>
      <NavLink to="/" aria-label="Go to Home">
        <img src={budgetBuddy} alt="" height={30} />
        <span>
          <span className="accent">Budget</span>Buddy
        </span>
      </NavLink>
      {userName && (
        <Form
          method="post"
          action="logout"
          onSubmit={(evt) => {
            if (
              !confirm(
                "Are you sure you want to end this session? All data will be deleted."
              )
            ) {
              evt.preventDefault();
            }
          }}
        >
          <button type="submit" className="btn btn--warning">
            <span>End Session</span>
            <TrashIcon width={20} />
          </button>
        </Form>
      )}
    </nav>
  );
};

export default Nav;
