import React, { useState, useEffect } from "react";

const FeeStructure = ({ data }) => {
  const [amount, setAmount] = useState(null);
  const courses = ["Medical", "Dental", "Ayurveda"];
  const levels = ["UG", "PG", "DIPLOMA", "Ph.D"];
  const [nation,setNation]=useState('');
  const [feeData, setFeeData] = useState({
    selectedFee: null,
    nationality: null,
    course: null,
    level: null,
  });
  const [feeList, setFeeList] = useState({
    nationalityList: null,
    courseList: null,
    levelsList: null,
  });
  let feesList = Object.keys(data);
  const handleFeesSelection = (e) => {
    setAmount(null);
    const nationalityList1 = data[e.target.value]
      ? Object.keys(data[e.target.value])
      : null;
    setFeeList({
      ...feeList,
      courseList: null,
      levelsList: null,
      nationalityList: nationalityList1,
    });
    setFeeData({
      ...feeData,
      course: null,
      level: null,
      selectedFee: e.target.value,
      nationality: null,
    });
  };

  const handleNationalitySelection = (e) => {
    setAmount(null);
    const { selectedFee } = feeData;
    const courseList1 = !data[selectedFee][e.target.value]
      ? null
      : Object.keys(data[selectedFee][e.target.value])[0] === "ALL_COURSES​"
      ? courses
      : Object.keys(data[selectedFee][e.target.value]);
    setFeeList({ ...feeList, levelsList: null, courseList: courseList1 });
      setNation(e.target.value);
    setFeeData({
      ...feeData,
      course: null,
      level: null,
      nationality: e.target.value,
    });
  };
  const handleCourseSelection = (e) => {
    setAmount(null);
    const { selectedFee, nationality } = feeData;
    const levelsList1 = !data[selectedFee][nationality][e.target.value]
      ? null
      : Object.keys(data[selectedFee][nationality][e.target.value])[0] ===
          "ALL_LEVEL​" && selectedFee === "Exam Fee"
      ? levels
      : Object.keys(data[selectedFee][nationality][e.target.value]);
    setFeeList({ ...feeList, levelsList: levelsList1 });
    setFeeData({ ...feeData, level: null, course: e.target.value });
  };
  const handleLevelSelection = (e) => {
    const { selectedFee, nationality, course } = feeData;
    debugger;
    console.log(finalApplicationFee);
    console.log(finalExamFee);
    if (data[selectedFee][nationality][course][e.target.value]) {
    var finalApplicationFee= data[selectedFee][nationality][course][e.target.value]["amount"];
      setFeeData({ ...feeData, level: e.target.value });
      if(nation==="INDIAN" || nation==="SARRC"){
        finalApplicationFee=(finalApplicationFee/100)*18+finalApplicationFee;
      }
      else if(nation==="FOREIGN" || nation==="NRI"){
        finalApplicationFee=(finalApplicationFee/100)*28+finalApplicationFee;
      }
      setAmount(
        finalApplicationFee
      );
    } else {
      var finalExamFee= data[selectedFee][nationality][course]["ALL_LEVEL​"]["amount"];
      if(nation=="INDIAN" || nation==="SAARC"){
        finalExamFee=((finalExamFee/100))*18+finalExamFee;
      }
      else if(nation=="FOREIGN" || nation=="NRI"){
        finalExamFee=((finalExamFee/100)*28)+finalExamFee;
      }
      setFeeData({ ...feeData, level: "ALL_LEVEL" });
      setAmount(finalExamFee);
    }
  };
  return (
    <div className="feestructure">
      <div>
        <label> Select fee type </label>{" "}
        <select name="fees" onChange={handleFeesSelection}>
          <option value={null}>--Select Fee Type--</option>
          {feesList &&
            feesList.map((fee) => {
              return <option value={fee}>{fee}</option>;
            })}
        </select>
      </div>

      {feeList.nationalityList && (
        <div>
          <label> Select nationality </label>{" "}
          <select
            defaultValue={"--Select nationality--"}
            name="nationalities"
            onChange={handleNationalitySelection}
          >
            <option value={null}>--Select nationality--</option>
            {feeList.nationalityList.map((nationality, index) => {
              return (
                <option id={index} value={nationality}>
                  {nationality}
                </option>
              );
            })}
          </select>
        </div>
      )}
      {feeList.courseList && (
        <div>
          <label> Select Course </label>{" "}
          <select
            defaultValue={feeData.course}
            name="courses"
            onChange={handleCourseSelection}
          >
            <option value={null}>--Select Course--</option>
            {feeList.courseList.map((course) => {
              return <option value={"ALL_COURSES​"}>{course}</option>;
            })}
          </select>
        </div>
      )}
      {feeList.levelsList && (
        <div>
          <label> Select Level </label>{" "}
          <select name="levels" onChange={handleLevelSelection}>
            <option value={null}>--Select Level--</option>
            {feeList.levelsList.map((level) => {
              return <option value={level}>{level}</option>;
            })}
          </select>
        </div>
      )}
      {amount && <div>Final Amount: {amount}</div>}
    </div>
  );
};

export default FeeStructure;
