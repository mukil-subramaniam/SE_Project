import React, { useState } from 'react';

const PredictionForm = () => {
    const [symptoms, setSymptoms] = useState('');
    const [result, setResult] = useState('');
    const [error, setError] = useState('');
    const [symptomsArray] = useState([
        "itching", "skin_rash", "nodal_skin_eruptions", "continuous_sneezing", "shivering", "chills",
        "joint_pain", "stomach_pain", "acidity", "ulcers_on_tongue", "muscle_wasting", "vomiting",
        // Add more symptoms here...
    ]);

    const formattedSymptoms = symptomsArray.map(symptom =>
        symptom.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    );

    const handleSymptomClick = (symptom) => {
        const currentSymptoms = symptoms.split(',').map(s => s.trim()).filter(s => s.length > 0);
        if (!currentSymptoms.includes(symptom)) {
            setSymptoms([...currentSymptoms, symptom].join(', '));
        }
    };

    const predict = async () => {
        setError('');
        setResult('');

        if (!symptoms.trim()) {
            setError('Please enter the symptoms');
            return;
        }

        console.log('Sending symptoms:', symptoms); // Debugging statement

        try {
            const response = await fetch('http://localhost:5000/predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({ symptoms })
            });

            console.log('Response status:', response.status); // Debugging statement

            if (!response.ok) throw new Error(`HTTP error status: ${response.status}`);

            const data = await response.json();
            console.log('Response data:', data); // Debugging statement

            if (data.error) {
                setError(data.error);
            } else {
                setResult(`Prediction: ${data.disease}`);
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            setError('There was an error processing your request.');
        }
    };

    return (
        <div style={styles.container}>
            <h1>Disease Prediction System</h1>
            <h2>Stay Home, Use This Site, Help Society</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <textarea
                    style={styles.textarea}
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    placeholder="Enter symptoms separated by commas (e.g., Fever, Headache, Cough)"
                />
                <button type="button" style={styles.button} onClick={predict}>Predict</button>
            </form>
            <p style={styles.result}>{result}</p>
            <p style={styles.error}>{error}</p>

            <div id="symptoms-list" style={styles.symptomsList}>
                <h3>Possible Symptoms:</h3>
                <ul>
                    {formattedSymptoms.map((symptom, index) => (
                        <li key={index} style={styles.listItem} onClick={() => handleSymptomClick(symptom)}>
                            {symptom}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        color: '#ffffff',
        textAlign: 'center',
        padding: '50px',
        backgroundColor: '#2c3e50',
        minHeight: '100vh',
    },
    textarea: {
        display: 'block',
        margin: '20px auto',
        padding: '15px',
        fontSize: '16px',
        width: '80%',
        maxWidth: '500px',
        height: '120px',
        borderRadius: '8px',
        border: '1px solid #bdc3c7',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
        resize: 'none',
        outline: 'none',
        transition: 'border-color 0.3s',
    },
    textareaFocus: {
        borderColor: '#007bff',
    },
    button: {
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        padding: '10px 30px',
        fontSize: '16px',
        transition: 'background-color 0.3s',
    },
    buttonHover: {
        backgroundColor: '#0056b3',
    },
    result: {
        fontSize: '20px',
        marginTop: '20px',
        fontWeight: 'bold',
        color: '#ffcc00',
    },
    error: {
        fontSize: '20px',
        marginTop: '20px',
        fontWeight: 'bold',
        color: '#ff0000',
    },
    symptomsList: {
        marginTop: '30px',
        textAlign: 'left',
        display: 'inline-block',
        background: 'rgba(0, 0, 0, 0.5)',
        padding: '20px',
        borderRadius: '8px',
    },
    listItem: {
        margin: '5px 0',
        cursor: 'pointer',
        color: '#ffffff',
    },
};

export default PredictionForm;
