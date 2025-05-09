import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'

const AdoptionForm = ({ pet, onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  const processSubmit = (data) => {
    setIsSubmitting(true)
    
    setTimeout(() => {
      onSubmit({ ...data, petId: pet.id, petName: pet.name })
      setIsSubmitting(false)
      setIsSuccess(true)
      reset()
      
      setTimeout(() => {
        setIsSuccess(false)
      }, 5000)
    }, 1500)
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-primary-50 p-4 border-b border-primary-100">
        <h3 className="text-lg font-medium text-primary-900">Adoption Application</h3>
        <p className="text-sm text-primary-700">Please fill out this form to express your interest in adopting {pet.name}</p>
      </div>

      {isSuccess ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 text-center"
        >
          <div className="text-center mb-4">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">Application Submitted!</h3>
          <p className="text-gray-600 mb-4">
            Thank you for your interest in adopting {pet.name}. We've received your application
            and will be in touch with you shortly.
          </p>
          <button
            type="button"
            onClick={() => setIsSuccess(false)}
            className="btn-outline btn-md"
          >
            Submit Another Application
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit(processSubmit)} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="label">First Name</label>
              <input
                id="firstName"
                type="text"
                className={`input ${errors.firstName ? 'border-red-500 focus:ring-red-500' : ''}`}
                {...register('firstName', { required: 'First name is required' })}
              />
              {errors.firstName && (
                <p className="mt-1 text-xs text-red-500">{errors.firstName.message}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="label">Last Name</label>
              <input
                id="lastName"
                type="text"
                className={`input ${errors.lastName ? 'border-red-500 focus:ring-red-500' : ''}`}
                {...register('lastName', { required: 'Last name is required' })}
              />
              {errors.lastName && (
                <p className="mt-1 text-xs text-red-500">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="label">Email</label>
            <input
              id="email"
              type="email"
              className={`input ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="label">Phone Number</label>
            <input
              id="phone"
              type="tel"
              className={`input ${errors.phone ? 'border-red-500 focus:ring-red-500' : ''}`}
              {...register('phone', { 
                required: 'Phone number is required',
                pattern: {
                  value: /^[6-9]\d{9}$/,
                  message: 'Please enter a valid Indian phone number (10 digits, starting with 6-9)'
                }
              })}
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="label">Address</label>
            <input
              id="address"
              type="text"
              className={`input ${errors.address ? 'border-red-500 focus:ring-red-500' : ''}`}
              {...register('address', { 
                required: 'Address is required',
                minLength: {
                  value: 5,
                  message: 'Address must be at least 5 characters'
                }
              })}
            />
            {errors.address && (
              <p className="mt-1 text-xs text-red-500">{errors.address.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* City */}
            <div>
              <label htmlFor="city" className="label">City</label>
              <input
                id="city"
                type="text"
                className={`input ${errors.city ? 'border-red-500 focus:ring-red-500' : ''}`}
                {...register('city', { required: 'City is required' })}
              />
              {errors.city && (
                <p className="mt-1 text-xs text-red-500">{errors.city.message}</p>
              )}
            </div>

            {/* State */}
            <div>
              <label htmlFor="state" className="label">State</label>
              <input
                id="state"
                type="text"
                className={`input ${errors.state ? 'border-red-500 focus:ring-red-500' : ''}`}
                {...register('state', { required: 'State is required' })}
              />
              {errors.state && (
                <p className="mt-1 text-xs text-red-500">{errors.state.message}</p>
              )}
            </div>

            {/* Zip */}
            <div>
              <label htmlFor="zip" className="label">Pin Code</label>
              <input
                id="zip"
                type="text"
                className={`input ${errors.zip ? 'border-red-500 focus:ring-red-500' : ''}`}
                {...register('zip', { 
                  required: 'Pin code is required',
                  pattern: {
                    value: /^\d{6}$/,
                    message: 'Please enter a valid 6-digit Indian pin code'
                  }
                })}
              />
              {errors.zip && (
                <p className="mt-1 text-xs text-red-500">{errors.zip.message}</p>
              )}
            </div>
          </div>

          {/* Housing Type */}
          <div>
            <label htmlFor="housingType" className="label">Housing Type</label>
            <select
              id="housingType"
              className={`input ${errors.housingType ? 'border-red-500 focus:ring-red-500' : ''}`}
              {...register('housingType', { required: 'Please select your housing type' })}
            >
              <option value="">Select housing type</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="condo">Condo</option>
              <option value="other">Other</option>
            </select>
            {errors.housingType && (
              <p className="mt-1 text-xs text-red-500">{errors.housingType.message}</p>
            )}
          </div>

          {/* Experience */}
          <div>
            <label htmlFor="experience" className="label">
              Previous Pet Experience
            </label>
            <select
              id="experience"
              className={`input ${errors.experience ? 'border-red-500 focus:ring-red-500' : ''}`}
              {...register('experience', { required: 'Please select your experience level' })}
            >
              <option value="">Select experience level</option>
              <option value="first">First-time pet owner</option>
              <option value="some">Some experience</option>
              <option value="experienced">Experienced pet owner</option>
            </select>
            {errors.experience && (
              <p className="mt-1 text-xs text-red-500">{errors.experience.message}</p>
            )}
          </div>

          {/* Additional Information */}
          <div>
            <label htmlFor="additionalInfo" className="label">
              Why do you want to adopt this pet?
            </label>
            <textarea
              id="additionalInfo"
              rows={4}
              className={`input ${errors.additionalInfo ? 'border-red-500 focus:ring-red-500' : ''}`}
              {...register('additionalInfo', { 
                required: 'Please tell us why you want to adopt this pet',
                minLength: {
                  value: 30,
                  message: 'Please provide more information (at least 30 characters)'
                }
              })}
            ></textarea>
            {errors.additionalInfo && (
              <p className="mt-1 text-xs text-red-500">{errors.additionalInfo.message}</p>
            )}
          </div>

          {/* Agreement */}
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="agreement"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                {...register('agreement', { required: 'You must agree to the terms' })}
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="agreement" className="font-medium text-gray-700">
                I agree to the adoption policies and home check requirements
              </label>
              {errors.agreement && (
                <p className="mt-1 text-xs text-red-500">{errors.agreement.message}</p>
              )}
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary btn-lg w-full"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                'Submit Application'
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default AdoptionForm