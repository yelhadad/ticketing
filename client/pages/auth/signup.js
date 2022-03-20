import { useState } from 'react';
import axios from 'axios'
const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const response =  await axios.post('/api/users/signup',
             { email, password })
             console.log(response)
        } catch (error) {
            console.log(error.response)
        }
    } 

    return(
        <form className='container' id='form-signin' onSubmit={onSubmit}
        style={{width: '600px', height: '1000px', margin: '50px auto' }}>
            <h3 style={{textAlign: 'center'}}>signup :)</h3>
            <div class="form-group">
                <label>Email adrres</label>
                <input type="email" className='form-control' placeholder='Enter email' onChange={e => setEmail( e.target.value)}/>
                <small className='form-text text-muted'>for testing purpses</small>
            </div>
            <div className='form-group'>
                <label>Password</label>
                <input type="password" className='form-control' placeholder='Enter password' onChange={e => setPassword(e.target.value)}/>
                <small>for testing</small>
            </div>
            <div>
                <button type='submit' className='btn btn-primary'>submit</button>
            </div>
        </form>
    )
}

export default Signup