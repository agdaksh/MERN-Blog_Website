import React from "react";

export default function Foot(){
    const year = new Date();
    return (
        <div>
        <div class="footer-padding"></div>
        <div className="footer">
               <p>Copyright @ {year.getFullYear()}</p>
        </div>
        </div>
    )
}