import React, { useState,useEffect } from 'react';
import './ProblemTable.css'; // Import the CSS file
import { FaCheck } from 'react-icons/fa';

const ProblemTable = () => {
  const [problems, setProblems] = useState([]);
    const [solvedProblems, setSolvedProblems] = useState(() => {
    const storedSolved = localStorage.getItem('solvedProblems');
    return storedSolved ? JSON.parse(storedSolved) : {};
  });

   useEffect(() => {
    // Load data (replace with your actual data loading logic)
      const problemData = [
          {
          "id": 1,
          "name": "Two Sum",
          "company": ["Google","Facebook"],
          "links": {
            "leetcode": "https://leetcode.com/problems/two-sum/",
            "gfg": "https://www.geeksforgeeks.org/problems/two-sum",
            "codingninja":"https://www.codingninjas.com/studio/problems/pair-sum_697"
          }
        },
         {
          "id": 2,
          "name": "Reverse Linked List",
          "company": ["Amazon","Microsoft"],
          "links": {
            "leetcode": "https://leetcode.com/problems/reverse-linked-list/",
            "gfg": "https://www.geeksforgeeks.org/reverse-a-linked-list/",
            "codingninja":"https://www.codingninjas.com/studio/problems/reverse-linked-list_933443"
          }
        },
        {
          "id": 3,
          "name": "Binary Tree Inorder Traversal",
          "company": ["Apple","Microsoft"],
          "links": {
             "leetcode": "https://leetcode.com/problems/binary-tree-inorder-traversal/",
             "gfg": "https://www.geeksforgeeks.org/inorder-tree-traversal/",
             "codingninja":"https://www.codingninjas.com/studio/problems/inorder-traversal_2048081"
          }
        }
      ];
      setProblems(problemData)
    }, []);

  useEffect(() => {
    localStorage.setItem('solvedProblems', JSON.stringify(solvedProblems));
  }, [solvedProblems]);


  const handleCheckboxChange = (id) => {
    setSolvedProblems((prevSolved) => ({
      ...prevSolved,
      [id]: !prevSolved[id],
    }));
  };

  return (
    <div className="table-container">
      <table className="problem-table">
        <thead>
          <tr>
            <th>Solved</th>
            <th>Problem Name</th>
            <th>Company Name</th>
            {Object.keys(problems[0]?.links || {}).map((platform) => (
              <th key={platform}>{platform.toUpperCase()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {problems.map((problem) => (
            <tr key={problem.id}>
              <td>
                <input
                  type="checkbox"
                  checked={!!solvedProblems[problem.id]}
                  onChange={() => handleCheckboxChange(problem.id)}
                  className="checkbox"
                />
                 {solvedProblems[problem.id] && <FaCheck className="check-icon"/>}
              </td>
              <td>{problem.name}</td>
                 <td>{problem.company.join(",")}</td>
              {Object.entries(problem.links).map(([platform, link]) => (
                <td key={platform}>
                  <a href={link} target="_blank" rel="noopener noreferrer"  className="link">
                    {platform.toUpperCase()}
                  </a>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProblemTable;