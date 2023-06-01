import * as React from "react";
import { useForm } from "react-hook-form";
import InputField from "../UI/InputField";
import styles from "./GenerateForm.module.scss";

const GenerateForm = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
    } = useForm({
        mode: "all", // "onChange" + "onBlur"
    });

    // All variables from the form which we want to pass as arguments to the deployNewTicketCollection() function
    const eventName = watch("eventName", false); // false is defeault value
    const eventSymbol = watch("eventSymbol", false);
    const eventDescription = watch("eventDescription", false);
    const eventDate = watch("eventDate", false);
    const ticketAmount = watch("ticketAmount", false); // should be passed to constructor
    const ticketPrice = watch("ticketPrice", false);
    const ticketImage = watch("ticketImage", false);

    const onSubmit = async (data) => {
        console.log("adding new event");
        console.log(data);
    };

    return (
        <>
            <form className={styles.registerTicketForm} onSubmit={handleSubmit(onSubmit)}>
                <InputField
                    type="text"
                    name="eventName"
                    label="Event Name"
                    placeholder="Enter your event name here"
                    errors={errors}
                    register={register}
                    validationSchema={{
                        required: "Event Name is required",
                    }}
                    required
                />
                <InputField
                    type="text"
                    name="eventDescription"
                    label="Event Description"
                    placeholder="Enter your event description here"
                    errors={errors}
                    register={register}
                    validationSchema={{
                        required: "Event Description is required.",
                    }}
                    required
                />
                <InputField
                    type="text"
                    name="eventDate"
                    label="Event Date"
                    placeholder="Enter the begin and end date of your event here"
                    errors={errors}
                    register={register}
                    validationSchema={{
                        required: "Event Date is required.",
                    }}
                    required
                />
                <InputField
                    type="number"
                    name="ticketPrice"
                    label="Single Ticket Price"
                    placeholder="Enter the price per ticket of your event here"
                    errors={errors}
                    register={register}
                    validationSchema={{
                        required: "Ticket price is required",
                        maxLength: { value: 32, message: "Can't be more than 32 characters" },
                    }}
                    required
                />
                <InputField
                    type="number"
                    name="ticketAmount"
                    label="Total Ticket Amount"
                    placeholder="Enter the total amount of tickets here"
                    errors={errors}
                    register={register}
                    validationSchema={{
                        required: "Ticket amount is required",
                        maxLength: { value: 32, message: "Can't be more than 32 characters" },
                    }}
                    required
                />
            </form>
        </>
    );
};

export default GenerateForm;
