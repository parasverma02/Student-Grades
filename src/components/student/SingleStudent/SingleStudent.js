import React, { Component } from 'react';
import classes from './SingleStudent.module.css';
import Input from '../../UI/Input/Input';
const SingleStudent = props => {


    const ENTER_KEY_CODE = 13;
    const textInput = React.useRef();
    const clearInput = () => (textInput.current.value = "");

    const handleEnter = (event, id) => {
        if (event.charCode === ENTER_KEY_CODE) {
            props.addTagHandler(event.target.value, id);
            clearInput();

        }
    }


    let average = props.grades.reduce((acc, val) => acc + parseInt(val), 0)
    average = average / props.grades.length;
    const tagsElements = props.tags.map((tag, index) => <span key={index}>{tag}</span>)
    const grades = props.grades.map((grade, index) => <p key={index}>Test {index + 1}:&emsp;{grade}% </p>)

    return (
        <div className={classes.StudentContainer}>
            <div className={classes.StudentCollapsible}>
                <div className={classes.ImageContainer}>
                    <img src={props.pic} />
                </div>
                <div className={classes.StudentInfoContainer}>
                    <div className={classes.StudentName_Expand}>
                        <h1>{props.firstName + ' ' + props.lastName}</h1>
                        <div className={classes.ExpandButton}>
                            <h1 onClick={() => props.collapseHandler(props.id)}>+</h1>
                        </div>
                    </div>
                    <div className={classes.StudentInfo}>
                        <p>Email: {props.email}</p>
                        <p>Company: {props.company}</p>
                        <p>Skill: {props.skill}</p>
                        <p>Average: {average}%</p>
                    </div>
                    <div className={props.show ? classes.StudentInfo : classes.NoneDisplay}>
                        {grades}
                    </div>
                    <div className={tagsElements.length ? classes.Tags : classes.NoneDisplay}>
                        {tagsElements}
                    </div>
                    <div className={classes.AddTag}>
                        <Input
                            type='text'
                            style={{ fontSize: '15px', width: 'auto' }}
                            placeholder='Add a tag'
                            ref={textInput}
                            onKeyPress={(event) => handleEnter(event, props.id)}
                        />
                    </div>

                </div>
            </div>
        </div>
    )




}

export default SingleStudent;