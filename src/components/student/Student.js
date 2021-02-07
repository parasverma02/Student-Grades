import React, { Component } from 'react';
import SingleStudent from './SingleStudent/SingleStudent';
import classes from './Student.module.css';
import Input from '../UI/Input/Input';

class Student extends Component {
    state = {
        students: [],
        filteredStudents: [],
        nameFilter: '',
        tagFilter: ''
    };
    componentDidMount = () => {
        fetch('https://api.hatchways.io/assessment/students')
            .then(response => response.json())
            .then(data => {
                const studentData = data.students.map(data => {
                    return {
                        ...data,
                        show: false,
                        tags: []
                    };
                })
                this.setState({ students: studentData });
                this.setState({filteredStudents: studentData})
            }
            );
    }

    collapseFunc = (studentsData,id) => {
        return studentsData.map(student => {
            if (student.id === id) {
                student.show = !student.show;
            }
            return student;
        })  
    }
    collapseHandler = id => {
        let filteredStudentsData = JSON.parse(JSON.stringify(this.state.filteredStudents));
        let originalStudentsData = JSON.parse(JSON.stringify(this.state.students));
        filteredStudentsData = this.collapseFunc(filteredStudentsData,id);
        originalStudentsData = this.collapseFunc(originalStudentsData,id);
        this.setState({ filteredStudents: filteredStudentsData })
        this.setState({ students: originalStudentsData})
    }
    
    tagFunc = (studentsData,value,id) => {
        return studentsData = studentsData.map(student => {
            if (student.id === id) {
                student.tags.push(value)

            }
            return student;
        })
    }
    addTagHandler = (value, id) => {

        let filteredStudentsData = JSON.parse(JSON.stringify(this.state.filteredStudents));
        let originalStudentsData = JSON.parse(JSON.stringify(this.state.students));
        filteredStudentsData = this.tagFunc(filteredStudentsData,value,id);
        originalStudentsData = this.tagFunc(originalStudentsData,value,id);
        this.setState({ filteredStudents: filteredStudentsData })
        this.setState({ students: originalStudentsData})
    }

    FilterHandler = (event) => {
        const { name, value } = event.target;
        this.setState({filteredStudents: this.state.students})
        this.setState({ [name]: value.toLowerCase()}, () => {
            
            let copyStudents = JSON.parse(JSON.stringify(this.state.filteredStudents));
            const filteredStudents = []
            copyStudents.map(student => {
                if (student.firstName.toLowerCase().startsWith(this.state.nameFilter) || student.lastName.toLowerCase().startsWith(this.state.nameFilter)) {
                    if(this.state.tagFilter!=''){
                        student.tags.forEach(tag => {
                            if(tag.toLowerCase().startsWith(this.state.tagFilter)) {
                                filteredStudents.push(student)
                                return
                            }
                        })  
                    }
                    else{
                    filteredStudents.push(student)
                    }
                }
            })
            this.setState({ filteredStudents: filteredStudents }, () => {
            })

        });
    }
    render() {

        const studentsArray = this.state.filteredStudents.map(student => (
            <SingleStudent
                key={student.id}
                {...student}
                collapseHandler={this.collapseHandler}
                addTagHandler={this.addTagHandler}
            />
        ));
        return (
            <div className={classes.Container}>
                <div className={classes.FilterSearchContainer}>
                    <div className={classes.InputStyle}>
                        <Input
                            type='text'
                            placeholder='Search by Name'
                            style={{ width: '96%', margin: '5px auto', fontSize: '20px' }}
                            name='nameFilter'
                            value={this.state.nameFilter}
                            onChange={(event) => this.FilterHandler(event)}
                        />
                    </div>
                    <div className={classes.InputStyle}>
                        <Input
                            type='text'
                            placeholder='Search by Tag'
                            style={{ width: '96%', margin: '5px auto', fontSize: '20px' }}
                            name='tagFilter'
                            value={this.state.tagFilter}
                            onChange={(event) => this.FilterHandler(event)}
                        />

                    </div>
                </div>
                {studentsArray}
            </div>
        );
    }
}

export default Student;