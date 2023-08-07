import './App.css';
import EngagementMessagesOverTime from './EngagementMessagesOverTime';
import { channels, messageCountList } from './constants';

function App() {

  return (
    <div className="App">
      <EngagementMessagesOverTime messageCountList={messageCountList} channels={channels}/>
    </div>
  );
}

export default App;
