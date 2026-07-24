import SettingsForm from './components/SettingsForm';
import './App.css';

function App() {
  const handleSave = (formData) => {
    console.log('Submitted settings:', formData);
  };

  return (
    <div className="app-layout">
      <SettingsForm onSubmitSuccess={handleSave} />
    </div>
  );
}

export default App;
