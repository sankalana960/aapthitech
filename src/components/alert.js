"use client";
export function Alert({status, text1, text2, top, right }) {  // Destructuring props directly

  return (
    <>
      {status?<div className="alert alert-warning alert-dismissible fade show" role="alert" style={{ position: 'absolute', top: top, right: right }}>
        <strong>{text1}</strong> {text2}
      </div>:<></>}
    </>
  );
}
