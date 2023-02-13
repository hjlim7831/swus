import React, { useState, useEffect }  from 'react';
import './Report.css';
import { Box, Checkbox, Grid, Icon, Divider } from '@mui/material';
import logo from "../../logo.png";
import { v4 as uuidv4 } from 'uuid';
import AddIcon from '@mui/icons-material/Add';


function Report (props) {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header, payload } = props;

	const [toggles, setToggles] = useState([]);

	useEffect(() => {
		let newToggles = [];

		if (Array.isArray(payload) && payload.length > 0) {
			for (let i = 0; i < payload.length; i++) {
				newToggles.push(false);
				console.log(toggles);
			};
		}	else {
			return
		}

		
		console.log("여기야 여기!");
		console.log(payload);
		
		setToggles(newToggles);
	}, []);

	function weekTopics() {

		function getMemberTodos(member) {
			// if (Array.isArray(member) && member.length > 0) {
			// 	console.log("웨지감자")
				return member.todos.map((todo) => {
					return (
						<>
							<p style={{ margin: 0 }}>
								{(todo.todo_done === "Y") ? <Checkbox checked={true} disabled/> : <Checkbox checked={false} disabled/>}
								{todo.content}
							</p>
						</>
					)
				})
			// }	else {
			// 	return null
			// }
		}

		function details(index) {
			if (Array.isArray(payload.rounds[index].members) && payload.rounds[index].members.length > 0) {
				return payload.rounds[index].members.map((member) => {
					return (
						<>
							<Grid container sx={{ display: "flex", alignItems: "center" }}>
								<Grid item xs={3}></Grid>
								<Grid item xs={2}>
									<div style={{ fontWeight: "bold", 
																margineInline: 5, 
																padding: 5, 
																textAlign: "center", 
																alignItems: "center",  
																justifyContent: "flex-start", 
																display: "flex",
																fontSize: "20px"}}>
										{member.nickname}
									</div>
								</Grid>
								<Grid item xs={7}>
								<div style={{ margineInline: 5, 
															padding: 5,  
															display: "flex",
															flexDirection: 'column',
															justifyContent: "center" }}>
										{getMemberTodos(member)}
									</div>
								</Grid>
							</Grid>
								<Divider orientation='horizontal' flexItem />
						</>
					)
				});
			}	else {
				return null
			}
		}

		function toggleFeature(index) {
			const newToggles = [...toggles];
			newToggles[index] =!newToggles[index];
			console.log(`${newToggles[index]}`)
			setToggles(newToggles);
		}

		if (Array.isArray(payload.rounds) && payload.rounds.length > 0) {
			return payload.rounds.map((topic, index) => {
				return (
					<>
						<Grid container sx={{ display: "flex", alignItems: "center", marginBlock: "20px" }} key={uuidv4()}>
							<Grid item xs={3}>
								<div style={{ fontWeight: "bold", 
															margineInline: 5, 
															padding: 5, 
															textAlign: "center", 
															alignItems: "center", 
															height: "40px", 
															justifyContent: "center", 
															display: "flex"}}>
									<span style={{ verticalAlign: "middle", display: "inline-block"}}>{topic.round}주차</span>
								</div>
							</Grid>
							<Grid item xs={8}>
								<div style={{  padding: 5, marginLeft: 3, backgroundColor: "#F4EFE6", height: "35px", borderRadius: "20px", display: "flex", justifyContent: "center", alignItems: "center" }}>
									<span 
										style={{ verticalAlign: "middle", display: "inline-block", "&:hover": { cursor: "pointer" } }}>{topic.content}</span>
								</div>
							</Grid>
							<Grid item xs={1}>
								<Icon 
									sx={{ "&:hover": { cursor: "pointer" }, marginLeft: 2, marginTop: 1, color: "#7468CF" }}
									onClick={() => toggleFeature(index)}>
										add_circle
								</Icon>
							</Grid>
						</Grid>
						{(toggles[index] === true) ? details(index) : null}
					</>
				);
			})
		}	else	{
			return
		}
	}
  

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section style={{ width: "70vw", height: "90vh", marginTop: "50px"}}>
          <header>
            <img
							src={logo}
							width="65px"
							heigth="58px"
							alt="react"
							style={{ position: "absolute", left: "2%", top: "20%" }}
            />
            {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>
						{props.children}
						<div style={{ overflowY: "scroll", height: "500px"}}>
							{weekTopics()}
						</div>
					</main>
          {/* <footer>
            <button className="close" onClick={close}>
              close
            </button>
          </footer> */}
        </section>
      ) : null}
    </div>
  );
};

export default Report;
