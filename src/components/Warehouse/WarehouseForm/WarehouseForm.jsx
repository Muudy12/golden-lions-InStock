import FormInput from "../FormInput/WarehouseFormInput";
import "./WarehouseForm.scss"

function WarehouseForm({ warehouseInfo, formErrors, validationHandler }) {
    return (
        <div className="form__element">
            {/* Warehouse Information */}
            <div className="form__element-warehouse">
                <h2 className="form__element-warehouse-title">Warehouse Details</h2>

                {/* Warehouse Name */}
                <FormInput
                    label="Warehouse Name"
                    name="name"
                    value={warehouseInfo.name}
                    error={formErrors.name}
                    onChange={validationHandler}
                />

                {/* Street Address */}
                <FormInput
                    label="Street Address"
                    name="street"
                    value={warehouseInfo.street}
                    error={formErrors.street}
                    onChange={validationHandler}
                />

                {/* City */}
                <FormInput
                    label="City"
                    name="city"
                    value={warehouseInfo.city}
                    error={formErrors.city}
                    onChange={validationHandler}
                />

                {/* Country */}
                <FormInput
                    label="Country"
                    name="country"
                    value={warehouseInfo.country}
                    error={formErrors.country}
                    onChange={validationHandler}
                />
            </div>

            {/* Contact Information */}
            <div className="form__element-contact">
                <h2 className="form__element-contact-title">Contact Details</h2>

                {/* Contact Name */}
                <FormInput
                    label="Contact Name"
                    name="contactName"
                    value={warehouseInfo.contactName}
                    error={formErrors.contactName}
                    onChange={validationHandler}
                />

                {/* Position */}
                <FormInput
                    label="Position"
                    name="position"
                    value={warehouseInfo.position}
                    error={formErrors.position}
                    onChange={validationHandler}
                />

                {/* Phone Number */}
                <FormInput
                    label="Phone Number"
                    name="phone"
                    value={warehouseInfo.phone}
                    error={formErrors.phone}
                    onChange={validationHandler}
                />

                {/* Email */}
                <FormInput
                    label="Email"
                    name="email"
                    value={warehouseInfo.email}
                    error={formErrors.email}
                    onChange={validationHandler}
                />
            </div>
        </div>
    );
}

export default WarehouseForm