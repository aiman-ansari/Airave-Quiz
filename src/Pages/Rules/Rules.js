import { Link, useParams } from "react-router-dom";
import "./Rules.css";
export const Rules = () => {
  const { id } = useParams();
  return (
    <div className='rules-container'>
      <div className='bold-text flex-align-center'>Rules to follow</div>
      <div className='rules'>
        <ul>
          <li>
            <i class='bi bi-info-circle-fill '></i>
            <span>
              Each question has the timer of 10 sec, which will be visible on
              the page.
            </span>
          </li>
          <li>
            <i class='bi bi-info-circle-fill '></i>
            <span>The quiz contains a total of 5 questions</span>
          </li>
          <li>
            <i class='bi bi-info-circle-fill '></i>
            <span>
              For each <span className='text-primary'>correct answer</span> you
              will be awarded with 5 points.
            </span>
          </li>
          <li>
            <i class='bi bi-info-circle-fill '></i>
            <span>
              There is a negative marking of 3 points for each{" "}
              <span className='text-danger'>wrong answer</span>.
            </span>
          </li>
          <li>
            <i class='bi bi-info-circle-fill '></i>
            <span>You cannot skip question. 😜</span>
          </li>
        </ul>
      </div>

      <div className='flex-align-center mt-1'>
        <Link to={`/${id}`}>
          <button className='btn btn-primary'>Start Quiz</button>
        </Link>
      </div>
    </div>
  );
};
