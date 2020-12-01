import React from 'react';
import { MemberEntity } from './model';

interface Props {
  member: MemberEntity;
}

export const MemberTableRow: React.FC<Props> = (props) => {
  const { member } = props;

  return (
    <tr>
      <td><img src={member.avatar_url} style={{ width: "5rem" }} /></td>
      <td>{ member.id}</td>
      <td>{member.login}</td>
    </tr>   
  );
};