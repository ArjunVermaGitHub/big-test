import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import engagementHelper from "./EngagementHelper";

const EngagementMessagesOverTime = ({messageCountList, channels})=>{
  const options = engagementHelper.engagementMessageOverTimeChartOptions(messageCountList, channels)
	return <HighchartsReact highcharts={Highcharts} options={options} />
}

export default EngagementMessagesOverTime