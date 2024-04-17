import Swal from "sweetalert2";

export default function Error() {

    return (
        <>
            {
                Swal.fire({
                    icon: "error",
                    title: "404",
                    text: 'Page not found',
                })
            }
        </>
    )
}