import Swal from "sweetalert2";

export const validateForm = (report, contactDetails, setErrors) => {
    let errors = {};
    let isValid = true;

    if (!report.userName.trim()) {
        errors.userName = 'User Name is required';
        isValid = false;
    }

    if (!contactDetails.address.trim()) {
        errors.address = 'Address is required';
        isValid = false;
    }

    if (!contactDetails.phone.trim()) {
        errors.phone = 'Phone Number is required';
        isValid = false;
    } else if (!/^\d{10}$/.test(contactDetails.phone.trim())) {
        errors.phone = 'Phone Number must be 10 digits';
        isValid = false;
    }

    if (report.location[0] === null || report.location[1] === null) {
        Swal.fire({
            title: 'Error',
            icon: 'error',
            text: 'Please Allow Location Access'
        });
        isValid = false
    }

    if (!contactDetails.email.trim()) {
        errors.email = 'Email Address is required';
        isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(contactDetails.email.trim())) {
        errors.email = 'Invalid Email Address';
        isValid = false;
    }

    if (!report.complaintText.trim()) {
        errors.complaintText = 'Complaint Description is required';
        isValid = false;
    }

    if (!report.category.trim()) {
        errors.category = 'Category is required';
        isValid = false;
    }

    if (!report.severity.trim()) {
        errors.severity = 'Severity is required';
        isValid = false;
    }
    setErrors(errors)
    return isValid
};


export const getLocation = () => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    resolve({ latitude, longitude });
                },
                (error) => {
                    reject(error);
                }
            );
        } else {
            reject(new Error('Geolocation is not supported by this browser.'));
        }
    });
};
