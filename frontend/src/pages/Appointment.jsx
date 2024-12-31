import React, {useState, useEffect} from "react";
import { bookAppointment, getDoctors } from "../api/appointmentApi";
import { useNavigate } from "react-router-dom";

const Appointment = () => {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [amount, setAmount] = useState('');
    const navigate = useNavigate();

    // Fetch list of doctors on component mount
    useEffect(() => {
        const fetchDoctors = async () => {
            try{
                const token = localStorage.getItem('token');
                const {data} = await getDoctors(token);
                setDoctors(data);
            }catch(error){
                console.error(error.response?.data || 'Failde to fetch doctors');
            }
        };

        fetchDoctors();
    }, []);

    const handleAppointmentBooking = async (e) => {
        e.preventDefault();
        if(!selectedDoctor){
            alert('Please select a Doctor');
            return;
        }
        try{
            const token = localStorage.getItem('token');
            const {data} = await bookAppointment(
                {doctorId: selectedDoctor, amount, patientId: 'current_patient_id'}, token
            );
            navigate('/dashboard');
        }catch(err){
            console.error(err.response?.data || 'Error booking appointment');
        }
    };

    return(
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow" style={{ width: '400px' }}>
                <h3 className="text-center mb-3">Book Appointment</h3>
                <form>
                    {/*Doctor Dropdown*/}
                    <div className="mb-3">
                        <label className="form-lable">Select Doctor</label>
                        <select className="form-select" value={selectedDoctor} onChange={(e) => setSelectedDoctor(e.target.value)}>
                            <option value="" disabled>Select a doctor</option>
                            {doctors.map((doctor) => (
                                <option key={doctor._id} value={doctor._id}>
                                    {doctor.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/*Amount Input*/}
                    <div className="mb-3">
                        <label className="form-label">Amount</label>
                        <input type="number" className="form-control" placeholder="Enter Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                    </div>

                    {/* Submit Button */}
                    <button onClick={handleAppointmentBooking} type="submit" className="btn btn-primary w-100">Book Appointment</button>
                </form>
                <p className="text-center mt-3">
                    Go back to <a href="/dashboard">Dashboard</a>
                </p>
            </div>
        </div>
    );
};

export default Appointment;