import React, { useState } from 'react'
import './App.css'

function App() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateStep1 = () => {
    const newErrors = {}
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email must be in valid format'
    }
    return newErrors
  }

  const validateStep2 = () => {
    const newErrors = {}
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const handleNext = () => {
    let newErrors = {}
    if (step === 1) {
      newErrors = validateStep1()
    } else if (step === 2) {
      newErrors = validateStep2()
    }

    if (Object.keys(newErrors).length === 0) {
      setErrors({})
      setStep((prev) => prev + 1)
    } else {
      setErrors(newErrors)
    }
  }

  const handleBack = () => {
    setStep((prev) => prev - 1)
    setErrors({})
  }

  const handleSubmit = () => {
    setSubmitted(true)
  }

  const handleReset = () => {
    setStep(1)
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      address: '',
      city: '',
      zipCode: '',
    })
    setErrors({})
    setSubmitted(false)
  }

  if (submitted) {
    return (
      <div className="form-container">
        <div className="success-screen">
          <div className="success-icon">✓</div>
          <h2>Success!</h2>
          <p>Your account has been created successfully.</p>
          <button onClick={handleReset} className="btn btn-primary">
            Create Another Account
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="form-container">
      <div className="form-card">
        <div className="step-indicator">
          <div className={`step ${step >= 1 ? 'active' : ''}`}>
            <span className="step-number">1</span>
            <span className="step-label">Personal Info</span>
          </div>
          <div className={`step-line ${step >= 2 ? 'active' : ''}`}></div>
          <div className={`step ${step >= 2 ? 'active' : ''}`}>
            <span className="step-number">2</span>
            <span className="step-label">Account Info</span>
          </div>
          <div className={`step-line ${step >= 3 ? 'active' : ''}`}></div>
          <div className={`step ${step >= 3 ? 'active' : ''}`}>
            <span className="step-number">3</span>
            <span className="step-label">Review</span>
          </div>
        </div>

        <div className="form-content">
          {step === 1 && (
            <div className="step-content">
              <h2>Personal Information</h2>
              <div className="form-group">
                <label htmlFor="firstName">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={errors.firstName ? 'error' : ''}
                  placeholder="Enter your first name"
                />
                {errors.firstName && (
                  <span className="error-message">{errors.firstName}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={errors.lastName ? 'error' : ''}
                  placeholder="Enter your last name"
                />
                {errors.lastName && (
                  <span className="error-message">{errors.lastName}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <span className="error-message">{errors.email}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="step-content">
              <h2>Account Information</h2>
              <div className="form-group">
                <label htmlFor="password">Password *</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? 'error' : ''}
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <span className="error-message">{errors.password}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password *</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={errors.confirmPassword ? 'error' : ''}
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && (
                  <span className="error-message">
                    {errors.confirmPassword}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter your city"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="zipCode">Zip Code</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    placeholder="Enter zip code"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="step-content">
              <h2>Review Your Information</h2>
              <div className="review-section">
                <div className="review-group">
                  <h3>Personal Information</h3>
                  <div className="review-item">
                    <span className="review-label">First Name:</span>
                    <span className="review-value">{formData.firstName}</span>
                  </div>
                  <div className="review-item">
                    <span className="review-label">Last Name:</span>
                    <span className="review-value">{formData.lastName}</span>
                  </div>
                  <div className="review-item">
                    <span className="review-label">Email:</span>
                    <span className="review-value">{formData.email}</span>
                  </div>
                  {formData.phone && (
                    <div className="review-item">
                      <span className="review-label">Phone:</span>
                      <span className="review-value">{formData.phone}</span>
                    </div>
                  )}
                </div>

                <div className="review-group">
                  <h3>Account Information</h3>
                  <div className="review-item">
                    <span className="review-label">Password:</span>
                    <span className="review-value">••••••</span>
                  </div>
                  {formData.address && (
                    <div className="review-item">
                      <span className="review-label">Address:</span>
                      <span className="review-value">{formData.address}</span>
                    </div>
                  )}
                  {formData.city && (
                    <div className="review-item">
                      <span className="review-label">City:</span>
                      <span className="review-value">{formData.city}</span>
                    </div>
                  )}
                  {formData.zipCode && (
                    <div className="review-item">
                      <span className="review-label">Zip Code:</span>
                      <span className="review-value">{formData.zipCode}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="form-actions">
            {step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="btn btn-secondary"
              >
                Back
              </button>
            )}
            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="btn btn-primary"
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="btn btn-primary"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

