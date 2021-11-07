import React from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography';
import {Line as LineChart} from 'react-chartjs-2';
export function MyChart(props) {
    let result = props.data.map(a => a.time);
    let _result = props.data.map(a => a.BMI);

    var chartData= {
      labels: result,
      datasets: [
        {
          label: 'BMI',
          fillColor: 'rgba(82,106,150,0.8)',
          strokeColor: 'rgba(82,106,150,0.8)',
          pointColor: 'rgba(82,106,150,0.8)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(82,106,150,0.8)',
          data:  _result

        },
        
      ]
    }
  
  
  const options = {
    scaleShowGridLines: false,
    scaleGridLineColor: 'rgba(0,0,0,.05)',
    scaleGridLineWidth: 1,
    scaleShowHorizontalLines: true,
    scaleShowVerticalLines: true,
    bezierCurve: true,
    bezierCurveTension: 0.4,
    pointDot: true,
    pointDotRadius: 8,
    pointDotStrokeWidth: 1,
    pointHitDetectionRadius: 20,
    datasetStroke: true,
    datasetStrokeWidth: 2,
    datasetFill: true,
    legendTemplate: '<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
  }
  
  const styles = {
    graphContainer: {
      border: '1px solid black',
      padding: '15px'
    }
  }
  
  
  return (
    <div style={styles.graphContainer}>
      <LineChart data={chartData}
        options={options}
        width="600" height="250"/>
    </div>
  )
}
export function SimpleCard(props) {
  const useStyles = makeStyles({
    root: {
      minWidth: 275,
      backgroundColor: '#274881!important;',
      color: '#fff',
      margin: 12
    },
    bullet: {
      display: 'inline-block',
      margin: '2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <IconButton style={{ color: "red" }}
        onClick={() => {
          props.onDelete();
        }}><CancelRoundedIcon />
      </IconButton>
      <CardContent>
        <Typography variant="h5" component="h2">
          BMI:{props.BMI}
        </Typography>

        <Typography variant="body2" component="h4">
          Weight:{props.weight} Height: {props.height} Date:{props.time}
          <br />
        </Typography>

      </CardContent>

    </Card>
  );

}
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      change: [],
      list: [],
      count: 0,
      obj: {
        height: "", weight: "", BMI: "", time:""
      }
    }


  }
  handleOnchangeWeight = (e) => {
    this.setState({
      obj: { weight: e.target.value, height: this.state.obj.height, BMI: "" , time:""}
    })
  }
  handleOnchangeHeight = (e) => {
    this.setState({
      obj: {
        height: e.target.value, weight: this.state.obj.weight, BMI: "", time:""
      }

    })
  }
  handleSubmit = () => {
    const _BMI =
      Math.round((this.state.obj.weight) / ((this.state.obj.height) / 100))
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      
      today = mm + '/' + dd + '/' + yyyy; 

    //this.setState(
    Object.assign(this.state.obj, { BMI: _BMI, time:today })
    //, () => { console.log(this.state.obj) }
    //);
    const newList = this.state.list.concat(this.state.obj)

    this.setState({

      list: newList,

    }, () => {
      console.log(this.state.list);
      console.log(this.state.obj.BMI);
    })

  }
  // this.setState({

  //   count: this.state.count + 1,
  //   
  //   }

  // }, () => {
  //   console.log(this.state.count);
  //   var Arr = this.state.obj, _Arr = this.state.change;
  //   if (this.state.count > 0) {

  //     var element = <div className="col-md-6 col-sm-12" key={Math.random()}>
  //       <SimpleCard BMI={this.state.obj.BMI} weight={this.state.obj.weight} height={this.state.obj.height} key={Math.random()} />
  //     </div>
  //     _Arr.push(element);
  //     this.setState({
  //       change: _Arr
  //     }, () => {
  //       console.log(this.state.change)
  //     })

  //   }
  // })



  deleteObj(index) {
    const newList = JSON.parse(JSON.stringify(this.state.list));
    newList.splice(index, 1);
    this.setState({
      list: newList
    });
  }

  render() {
    return (
      <div className="App">
        <h1 className="d-flex align-items-center justify-content-center m-4 p-4"> BMI CALCULATOR</h1>
        <form className="d-flex align-items-center justify-content-center m-4">
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <label>Enter Weight in kg</label> <br />
              <input name="weight" type="number" min="1" max="999" value={this.state.weight} onChange={this.handleOnchangeWeight} />
            </div>
            <div className="col-md-6 col-sm-12">
              <label>Enter Heigh in cm</label> <br />
              <input name="height" type="number" min="1" max="999" value={this.state.height} onChange={this.handleOnchangeHeight} />
            </div>

            <div className="col-md-m6 col-sm-12 m-4 d-flex text-align-center">
              <button id="bmi-btn" className="calculate-btn" type="button" disabled="" onClick={this.handleSubmit}>Calculate BMI</button>
            </div>
          </div>
        </form>
        <div className="d-flex align-items-center justify-content-center m-4">
           <MyChart data={this.state.list}/>
         </div>
        <div className="d-flex align-items-center justify-content-center m-4">
          <div className="data-container row">

            {this.state.list.map((obj, index) => {
              return (
                <div className="col-md-6 col-sm-12" key={Math.random()}>
                  <SimpleCard
                    BMI={obj.BMI}
                    weight={obj.weight}
                    height={obj.height}
                    key={Math.random()}
                    time={obj.time}
                    onDelete={() => this.deleteObj(index)} />
                </div>
              )
            })}

          </div>


        </div>




      </div >
    );
  }
}

