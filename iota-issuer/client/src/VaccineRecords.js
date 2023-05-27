import React, { useState, useEffect } from 'react';

const VaccineRecords = ({ onChildDataChange }) => {
    const [vaccineRecords, setVaccineRecords] = useState({
        record1: { checked: false, type: '', date: '', doctor: '', hospital: '' },
        record2: { checked: false, type: '', date: '', doctor: '', hospital: '' },
        record3: { checked: false, type: '', date: '', doctor: '', hospital: '' }
    });

    useEffect(() => {
        onChildDataChange(vaccineRecords);
    });

    const handleCheckboxChange = (record) => {
        setVaccineRecords(prevState => ({
            ...prevState,
            [record]: { ...prevState[record], checked: !prevState[record].checked }
        }));
    };

    const handleInputChange = (record, field, value) => {
        setVaccineRecords(prevState => ({
            ...prevState,
            [record]: { ...prevState[record], [field]: value }
        }));
    };

    return (
        <div>
            <h1>Vaccine Records</h1>
            <form>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={vaccineRecords.record1.checked}
                            onChange={() => handleCheckboxChange('record1')}
                        />
                        Record 1
                    </label>
                    {vaccineRecords.record1.checked && (
                        <div>
                            <input
                                type="text"
                                value={vaccineRecords.record1.type}
                                onChange={(e) => handleInputChange('record1', 'type', e.target.value)}
                                placeholder="Type"
                            />
                            <input
                                type="text"
                                value={vaccineRecords.record1.date}
                                onChange={(e) => handleInputChange('record1', 'date', e.target.value)}
                                placeholder="Date"
                            />
                            <input
                                type="text"
                                value={vaccineRecords.record1.doctor}
                                onChange={(e) => handleInputChange('record1', 'doctor', e.target.value)}
                                placeholder="Doctor"
                            />
                            <input
                                type="text"
                                value={vaccineRecords.record1.hospital}
                                onChange={(e) => handleInputChange('record1', 'hospital', e.target.value)}
                                placeholder="Hospital"
                            />
                        </div>
                    )}
                </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={vaccineRecords.record2.checked}
                            onChange={() => handleCheckboxChange('record2')}
                        />
                        Record 2
                    </label>
                    {vaccineRecords.record2.checked && (
                        <div>
                            <input
                                type="text"
                                value={vaccineRecords.record2.type}
                                onChange={(e) => handleInputChange('record2', 'type', e.target.value)}
                                placeholder="Type"
                            />
                            <input
                                type="text"
                                value={vaccineRecords.record2.date}
                                onChange={(e) => handleInputChange('record2', 'date', e.target.value)}
                                placeholder="Date"
                            />
                            <input
                                type="text"
                                value={vaccineRecords.record2.doctor}
                                onChange={(e) => handleInputChange('record2', 'doctor', e.target.value)}
                                placeholder="Doctor"
                            />
                            <input
                                type="text"
                                value={vaccineRecords.record2.hospital}
                                onChange={(e) => handleInputChange('record2', 'hospital', e.target.value)}
                                placeholder="Hospital"
                            />
                        </div>
                    )}
                </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={vaccineRecords.record3.checked}
                            onChange={() => handleCheckboxChange('record3')}
                        />
                        Record 3
                    </label>
                    {vaccineRecords.record3.checked && (
                        <div>
                            <input
                                type="text"
                                value={vaccineRecords.record3.type}
                                onChange={(e) => handleInputChange('record3', 'type', e.target.value)}
                                placeholder="Type"
                            />
                            <input
                                type="text"
                                value={vaccineRecords.record3.date}
                                onChange={(e) => handleInputChange('record3', 'date', e.target.value)}
                                placeholder="Date"
                            />
                            <input
                                type="text"
                                value={vaccineRecords.record3.doctor}
                                onChange={(e) => handleInputChange('record3', 'doctor', e.target.value)}
                                placeholder="Doctor"
                            />
                            <input
                                type="text"
                                value={vaccineRecords.record3.hospital}
                                onChange={(e) => handleInputChange('record3', 'hospital', e.target.value)}
                                placeholder="Hospital"
                            />
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
};

export default VaccineRecords;
