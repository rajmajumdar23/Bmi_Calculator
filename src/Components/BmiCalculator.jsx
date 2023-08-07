import React, { useState } from 'react';
import './Bmi.css';

const BmiCalculator = () => {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [bmi, setBMI] = useState(null);
    const [unitSystem, setUnitSystem] = useState('metric');

    const calculateBMI = () => {
        if (weight && height) {
            const heightInMeters = unitSystem === 'metric' ? height / 100 : height * 0.0254;
            const weightInKg = unitSystem === 'metric' ? weight : weight * 0.453592;
            const bmiValue = (weightInKg / (heightInMeters * heightInMeters)).toFixed(2);
            setBMI(bmiValue);
        }
    };

    const getBMICategory = (bmi) => {

        const categories = [
            { range: [0, 18.4], category: 'Underweight' },
            { range: [18.5, 24.9], category: 'Normal Weight' },
            { range: [25, 29.9], category: 'Overweight' },
            { range: [30, 34.9], category: 'Obesity Class I' },
            { range: [35, 39.9], category: 'Obesity Class II' },
            { range: [40, Infinity], category: 'Obesity Class III' },
        ];

        const matchedCategory = categories.find((item) => bmi >= item.range[0] && bmi <= item.range[1]);

        return matchedCategory ? matchedCategory.category : 'Unknown';
    };

    const getPersonalizedRecommendations = (bmiCategory) => {

        const recommendations = {
            'Underweight': 'Consider consulting a nutritionist for a balanced diet plan.',
            'Normal Weight': 'Maintain your healthy lifestyle with a balanced diet and regular exercise.',
            'Overweight': 'Focus on portion control and increase physical activity.',
            'Obesity Class I': 'Consult a healthcare professional for weight management guidance.',
            'Obesity Class II': 'Seek medical advice for weight management and health improvement.',
            'Obesity Class III': 'Consult a healthcare provider for comprehensive weight management support.',
        };

        return recommendations[bmiCategory] || 'No specific recommendations available.';
    };

    return (
        <div className="App">
            <h1>BMI Calculator</h1>
            <div className="container">
                <div className="label-input">
                    <label>Weight ({unitSystem === 'metric' ? 'kg' : 'lbs'}):</label>
                    <input
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                    />
                </div>
                <div className="label-input">
                    <label>Height ({unitSystem === 'metric' ? 'cm' : 'ft/in'}):</label>
                    <input
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                    />
                </div>
                <div className="unit-system">
                    <label>Unit System:</label>
                    <select value={unitSystem} onChange={(e) => setUnitSystem(e.target.value)}>
                        <option value="metric">Metric</option>
                        <option value="imperial">Imperial</option>
                    </select>
                </div>
                <button className="button" onClick={calculateBMI}>
                    Calculate BMI
                </button>
                {bmi && (
                    <div>
                        <p className="result">Your BMI: {bmi}</p>
                        <p className="category">BMI Category: {getBMICategory(parseFloat(bmi))}</p>
                        <p className="recommendation">
                            {getPersonalizedRecommendations(getBMICategory(parseFloat(bmi)))}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BmiCalculator;
