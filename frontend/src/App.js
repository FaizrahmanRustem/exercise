import React, {useState} from 'react';
import './App.css';
import http from './http-common';

const App = () => {

    const [nameCompany, setNameCompany] = useState('');
    const [establishedYear, setEstablishedYear] = useState(2020);
    const [summary, setSummary] = useState('');
    const [balanceSheet, setBalanceSheet] = useState([]);
    const [loadAmount, setLoadAmount] = useState(0);
    const [accountingProvider, setAccountingProvider] = useState('');
    const [preAssessment, setPreAssessment] = useState(20);

    const fetchBalanceSheet = () => {

        http.get(`/get/balance_sheet?year=${establishedYear}`)
            .then((res) => {
                if (res.data.status) {
                    setBalanceSheet(res.data.data);
                } else {
                    alert(res.data.message);
                }

            })
            .catch((err) => {
                alert(err.message);
            })

    };

    const submitApplication = () => {

        let averageAssetValue = 0;
        balanceSheet.map((item) => {
            averageAssetValue += parseInt(item.assetsValue);
        });

        averageAssetValue /= balanceSheet.length;
        if (averageAssetValue > loadAmount) setPreAssessment(100);

        http.post('/post/decision',
            {
                name: nameCompany,
                year: establishedYear,
                summary: summary,
                accounting: accountingProvider,
                preAssessment: preAssessment
            }).then((res) => {
                if (res.data.status) {
                    // todo : add code
                } else {
                    alert(res.data.message);
                }
            }).catch((err) => {
                alert(err.message);
            })

    }

    return (
        <React.Fragment>
            <div className={'main-container'}>
                <h3>Business Detail</h3>
                <div className={'sub-container'}>
                    <div>
                        <div>Name</div>
                        <input type={'text'} id={'input_name'} defaultValue={nameCompany}
                            onChange={(e) => {setNameCompany(e.target.value)}}/>
                    </div>
                    <div>
                        <div>Year established</div>
                        <input type={'number'} id={'input_year'} defaultValue={establishedYear}
                            onChange={(e) => {setEstablishedYear(parseInt(e.target.value))}}/>
                    </div>
                    <div>
                        <div>Summary of Profit or loss by th year</div>
                        <textarea id={'text_summary'} defaultValue={summary}
                            onChange={(e) => {setSummary(e.target.value)}}/>
                    </div>
                    <div>
                        <div>Loan Amount</div>
                        <input type={'number'} id={'input_loan_amount'} defaultValue={loadAmount}
                            onChange={(e) => setLoadAmount(parseInt(e.target.value))}/>
                    </div>
                    <div>
                        <div>Accounting Provider</div>
                        <div>
                            <select id={'select_accounting_provider'} onChange={(e) => {
                                setAccountingProvider(e.target.value);
                            }}>
                                <option value={'Xero'}>Xero</option>
                                <option value={'MYOB'}>MYOB</option>
                            </select>
                            <button onClick={() => {fetchBalanceSheet();}} style={{marginLeft: '1rem'}}>
                                Get Balance Sheet
                            </button>
                        </div>
                    </div>
                    <div>
                        <div>PreAssessment</div>
                        <input type={'number'} id={'input_pre_assessment'} defaultValue={preAssessment}
                            onChange={(e) => {setPreAssessment(parseInt(e.target.value))}}/>
                    </div>
                    <div>
                        <button onClick={() => {submitApplication();}}>Submit</button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )

}

export default App;