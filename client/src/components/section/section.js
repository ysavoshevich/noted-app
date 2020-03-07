import React, { useState } from "react";

import { StyledSection } from "./styles";
import Block from "../block/block";
import { LogoutButton } from "../buttons/";
import { logout } from "../../util";

function Section({ data, setData }) {
  const [showLogoutBtn, setShowLogoutBtn] = useState(true);
  const dataArr = Object.keys(data.toJS());
  return (
    <StyledSection>
      {showLogoutBtn && <LogoutButton onClick={logout} />}
      {dataArr.map((blockId, index) => (
        <Block
          key={blockId}
          entries={data.getIn([blockId, "entries"])}
          data={data}
          setData={setData}
          blockId={blockId}
          position={index}
          setShowLogoutBtn={setShowLogoutBtn}
        />
      ))}
    </StyledSection>
  );
}

export default Section;
