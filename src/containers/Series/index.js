import React, { Component } from 'react';
import SeriesList from '../../components/SeriesList';
import Loader from '../../components/Loader';
import Intro from '../../components/Intro';

class Series extends Component {
    state = {
        series: [],
        seriesName: '',  // to help keep track of what is inside input
        isFetching: false  //  to let us know whenever we are fetching something from the api
      }
    
      // invoked immediatly after component is rendered

      onSeriesInputChange = e => {
          this.setState({ seriesName: e.target.value, isFetching: true });
          
          fetch(`http://api.tvmaze.com/search/shows?q=${e.target.value}`)
          .then((response) => response.json())
          .then(json => this.setState({ series: json, isFetching: false })) 
      }

    render() {
        const { series, seriesName, isFetching } = this.state;
        return ( 
            <div>
                <Intro message="Here you can find all of your most loved series" />        
                <div>
                    <input 
                        value={seriesName}
                        type="text" 
                        onChange={this.onSeriesInputChange}>
                    </input>
                </div>
                { 
                    !isFetching && series.length === 0 && seriesName.trim() === ''
                    &&
                    <p>Enter series name into input</p>
                }
                {
                    !isFetching && series.length === 0 && seriesName.trim() !== '' 
                    &&
                    <p>No TV Series Found</p>

                }
                {
                    isFetching && <Loader />
                }
                {
                    !isFetching && <SeriesList list={this.state.series} />
                }
                
            </div>
        )
        
    }
}

export default Series;