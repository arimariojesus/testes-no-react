import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

interface IRepo {
  id: number;
  name: string;
  description: string | null;
  url: string;
  stargazers_count: number;
  forks: number;
  open_issues: number;
}

const List = () => {
  const { state } = useLocation<{ name: string } | undefined>();

  const [repos, setRepos] = useState<IRepo[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `https://api.github.com/users/${state?.name}/repos`
        );
        setRepos(data);
        console.log(repos);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [state?.name]);

  return (
    <div>
      <Link to="/">Voltar</Link>
      <p>Total de repos: {repos.length}</p>
      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            <p>{repo.name}</p>
            {repo?.description ? <p>{repo.description}</p> : null}
            <div>
              <a href={repo.url} target="_blank" rel="noreferrer noopener">
                Link
              </a>
            </div>
            <span>Starts: {repo.stargazers_count}</span>{" "}
            <span>Forks: {repo.forks}</span>{" "}
            <span>Issues: {repo.open_issues}</span>{" "}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default List;