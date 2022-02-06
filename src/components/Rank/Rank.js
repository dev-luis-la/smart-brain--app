import React from "react";

const Rank = ({name, imgEntries}) =>{
    return(
    <div>
    <div className="white f3">
        {`Hello ${name}, your  Entry Count is`}
    </div>
    <div className="white f3 ">
        {imgEntries}
    </div>
    </div>
    );
}
export  default  Rank;