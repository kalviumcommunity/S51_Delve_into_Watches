import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';


export default function UpdateData() {
    const { id } = useParams(); // Adjust here
    const navigate = useNavigate();
    const[WatchId,setWatchId] = useState('')
    const [modelName, setModelName] = useState('');
    const [company, setCompany] = useState('');
    const [producedYear, setProducedYear] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.patch(`https://delve-into-watches.onrender.com/patch/${id}`, { 
                ModelName: modelName,
                Company: company,
                ProducedYear: producedYear
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                console.log('Updated Watch:', response.data);
                navigate('/');
            } else {
                console.error('Update failed:', response.data.error);
            }
        } catch (error) {
            console.error('Error updating watch:', error);
        }
    };

    return (
        <>
            <h2>Update Data</h2>
            <div className="form-container">
                <form className='form' onSubmit={handleSubmit}>
                    <div className='div'>
                        <label htmlFor="WatchId">Watch ID</label>
                        <input type="text" id="WatchId" name="WatchId" value={WatchId} onChange={(e) => setWatchId(e.target.value)} />
                    </div>
                    <div className='div'>
                        <label htmlFor="ModelName">Model Name</label>
                        <input type="text" id="ModelName" name="ModelName" value={modelName} onChange={(e) => setModelName(e.target.value)} />
                    </div>
                    <div className='div'>
                        <label htmlFor="Company">Company</label>
                        <input type="text" id="Company" name="Company" value={company} onChange={(e) => setCompany(e.target.value)} />
                    </div>
                    <div className='div'>
                        <label htmlFor="ProducedYear">Produced Year</label>
                        <input type="text" id="ProducedYear" name="ProducedYear" value={producedYear} onChange={(e) => setProducedYear(e.target.value)} />
                    </div>
                    <input type="submit" className='submit' value="Submit" />
                </form>
            </div>
        </>
    );
}