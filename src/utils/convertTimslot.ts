export default function convertTimeslot(timeslot: string) {

    switch (timeslot) {
        case "MORNING": return "8-12"
        case "AFTERNOON": return "13-16"
        case "EVENING": return "17-20"
    }
}