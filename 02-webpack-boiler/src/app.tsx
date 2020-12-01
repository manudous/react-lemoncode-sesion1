import React from "react";
import { MemberTableRow } from "./member-table-row";
import { MemberEntity } from './model';

export const App = () => {
  const [members, setMembers] = React.useState<MemberEntity[]>([]);

  React.useEffect(() => {
    fetch(`https://api.github.com/orgs/lemoncode/members`)
      .then((response) => response.json())
      .then((json) => setMembers(json));
  }, []);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Id</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <MemberTableRow key={ member.id} member={ member}/>       
          ))}
        </tbody>
      </table>
    </>
  );
};
