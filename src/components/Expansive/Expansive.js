import React, { useEffect, useRef, useState } from 'react';
import './Expansive.css'
import { useParams } from 'react-router-dom';
import Axios from 'axios';

const Expansive = () => {
    
    const {user_id,user_name} =  useParams(); 

    const amount_detail = useRef();
    const amount = useRef();
    const [Expansive_list,setExpansive_list] = useState([]);

    const [MonthlyExpansive,setMonthlyExpansive] = useState(0);
    const [YearlyExpansive,setYearlyExpansive] = useState(0);


    const [showNewRecBox,setShowNewRecBox] = useState(false);

    useEffect(()=>{

        FetchExpandiveList();

    },[]);

    const FetchExpandiveList = () => {

        console.log('render...');

       const data = {user_id : user_id};
       Axios.post("http://localhost:8000/ExpansiveRecords",data).then((res)=>{

          if(res.data.status === 'success')
          {
              setExpansive_list(res.data.expansiveList);
              setMonthlyExpansive(res.data.Monthly_expansive);
              setYearlyExpansive(res.data.Yearly_expansive)
          }
          else if(res.data.status === 'error')
          {
            console.log(res.data.error_detail);
          }

          
           console.log(res.data);
       }).catch((err)=>{
           console.log(err);
       });

    }




    const InsertNewRec = (e) => {

        e.preventDefault();

        const data = {amount : amount.current.value,detail:amount_detail.current.value,user_id:user_id};

        Axios.post("http://localhost:8000/AddExpansive",data).then((res)=>{
            if(res.data.status === 'success')
            {
                alert("New Expansive Added!!");
                FetchExpandiveList();
                setShowNewRecBox(false);
            }
            else if(res.data.status === 'error')
            {
                alert(res.data.error_detail);
                setShowNewRecBox(false);
            }
        }).catch((err)=>{
            console.log(err);
        });

        console.log(data);

    }
  return (
    <>
    <div className='expansive'>
            <div className='expansive_list'>
                <table id='infoTable'>
                    <tr>
                        <th>DETAIL</th>
                        <th>AMOUNT</th>
                        <th>TIME</th>
                    </tr>

                    {Expansive_list.map((data) => {
                      
                        return(<tr key={data.REC_ID}>
                            <td>{data.AMOUNT_DETAIL}</td>
                            <td>{data.AMOUNT}</td>
                            <td>{data.TIME}</td>
                        </tr>)
                    })}
                </table>
            </div>
            <div className='user_details'>
                <h1>Hello {user_name}</h1>
                <h2>This Month Total Expansive = <span style={{color:'#1DE05E'}}>&#x20B9; {MonthlyExpansive}</span></h2>
                <h2>This Year Total Expansive = <span style={{color:'#1DE05E'}}>&#x20B9; {YearlyExpansive}</span></h2>
                <div className='btn_div'>

                <button id='insert_new_rec_btn' onClick={()=>{setShowNewRecBox(true);}}>New Expansive</button>

                </div>

                
            </div> 
    </div>

<div className='insert_new_rec_form' style={{display:showNewRecBox?'block':'none'}}>
    <div className='position_relative_box'>
    <h1>New Expansive</h1>
<form onSubmit={InsertNewRec}>
    <label>DETAIL</label>
    <input type='text' ref={amount_detail}></input>
    <label>AMOUNT</label>
    <input type='text' ref={amount}></input>
    <input type='submit'></input>
</form>
<span onClick={()=>{setShowNewRecBox(false);}}>&#10006;</span>
</div></div></>
  )
}

export default Expansive
