const engagementHelper = {
    engagementMessageOverTimeChartOptions: function (messageCountList, channels) {
        let channelNameById = {}

        for (let channel of channels) {
            channelNameById[channel.id] = channel.name
        }

        let numOfDates = {}, dataForChannel = {}
        for (let messageCount of messageCountList) {
            let channelsDates = numOfDates[messageCount.channelId],
                channelData = dataForChannel[messageCount.channelId],
                messageCountData = [Date.parse(messageCount.timeBucket), +messageCount.count]
            numOfDates[messageCount.channelId] = channelsDates ? channelsDates + 1 : 1
            dataForChannel[messageCount.channelId] = channelData ? [...channelData, messageCountData] : [messageCountData]
        }

        let series = []
        for (let key of Object.keys(numOfDates)) {
            if (numOfDates[key] > 1) {
                series.push({
                    name: channelNameById[key],
                    data: dataForChannel[key]
                })
            }
            else {
                delete numOfDates[key]
                delete dataForChannel[key]
            }
        }

        return {
            chart: {
                renderTo: 'container',
                type: 'spline'
            },
            events: {
                load: function () {
                  const chart = this;
        
                  // Add a custom plot line element to the chart
                  chart.customPlotLine = chart.renderer
                    .path({
                      stroke: 'red',
                      'stroke-width': 2,
                      zIndex: 5,
                    })
                    .add();
                },
                mouseOver: function (e) {
                  const chart = this;
                  const x = e.xAxis[0].value;
        
                  // Update the position of the custom plot line on mouseover
                  chart.customPlotLine.attr({
                    d: ['M', x, chart.plotTop, 'L', x, chart.plotTop + chart.plotHeight],
                  });
                },
                mouseOut: function () {
                  const chart = this;
        
                  // Hide the custom plot line on mouseout
                  chart.customPlotLine.attr({
                    d: [],
                  });
                },
              },
            title:{
                text:""
            },
            tooltip: {
                backgroundColor: "black",
                borderRadius: 1,
                borderColor: "#125357",
                opacity: 0.8,
                style:{
                    opacity: 0.8,
                    color: "#fff",
                },
                formatter: function () {
                    console.log(this)
                    return "<b>"+this?.series?.name +"</b><br>" +  this.y + " message"  + (this.y === 1 ? "":"s") + " on " +(new Date(this.x*1000)).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
                },
            },
            plotOptions: {
                series: {
                  point: {
                    events: {
                      mouseOver: function () {
                        const chart = this.series.chart;
                        const xAxis = chart.xAxis[0];
                        const xValue = this.x;
          
                        xAxis.removePlotLine('vertical-line');
          
                        xAxis.addPlotLine({
                          id: 'vertical-line',
                          value: xValue,
                          color: '#919295',
                          width: 1,
                          zIndex: 1,
                        });
                      },
                    },
                  },
                },
              },
                
            xAxis: {
                type: 'datetime',
                tickInterval: 1000 * 60 * 60 * 24,
                lineColor: '#4f565c',
                tickColor: '#4f565c',
                labels: {
                    style: {
                        color: '#4f565c',
                    },
                },
            },
            yAxis: {
                title: {
                    text: ''
                },
                lineColor: '#4f565c',
                tickColor: '#4f565c',
                gridLineWidth: 0,
                labels: {
                    style: {
                        color: '#4f565c',
                    },
                    formatter: function () {
                      return this.value + "-";
                    },
                  },
                  
            },
            legend:{
                itemStyle: {
                    color: 'white',
                },
                itemHoverStyle: {
                    color: 'whitesmoke',
                  },
            },
            series
    }
    }
}

export default engagementHelper