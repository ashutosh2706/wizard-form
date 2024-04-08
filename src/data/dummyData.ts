import { UserModel } from "../types/userModel";
import { UserRequest } from "../types/userRequest"
import { UserRequestAdmin } from "../types/userRequestAdmin";

function getCurrentDate(): string {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();

    return dd + '-' + mm + '-' + yyyy;
}

export const dummyData: UserRequest[] = [
    {
        requestId: 101,
        requestDate: getCurrentDate(),
        requestTitle: `Lorem ipsum dolor`,
        requestStatus: 'approved'
    },
    {
        requestId: 102,
        requestTitle: `Lorem ipsum dolor`,
        requestDate: getCurrentDate(),
        requestStatus: 'pending'
    },
    {
        requestId: 103,
        requestTitle: `Lorem ipsum dolor`,
        requestDate: getCurrentDate(),
        requestStatus: 'rejected'
    },
    {
        requestId: 101,
        requestDate: getCurrentDate(),
        requestTitle: `Lorem ipsum dolor`,
        requestStatus: 'approved'
    },
    {
        requestId: 102,
        requestTitle: `Lorem ipsum dolor`,
        requestDate: getCurrentDate(),
        requestStatus: 'pending'
    },
    {
        requestId: 103,
        requestTitle: `Lorem ipsum dolor`,
        requestDate: getCurrentDate(),
        requestStatus: 'rejected'
    },
    {
        requestId: 101,
        requestDate: getCurrentDate(),
        requestTitle: `Lorem ipsum dolor`,
        requestStatus: 'approved'
    },
    {
        requestId: 102,
        requestTitle: `Lorem ipsum dolor`,
        requestDate: getCurrentDate(),
        requestStatus: 'pending'
    },
    {
        requestId: 103,
        requestTitle: `Lorem ipsum dolor`,
        requestDate: getCurrentDate(),
        requestStatus: 'rejected'
    },
    {
        requestId: 101,
        requestDate: getCurrentDate(),
        requestTitle: `Lorem ipsum dolor`,
        requestStatus: 'approved'
    },
    {
        requestId: 102,
        requestTitle: `Lorem ipsum dolor`,
        requestDate: getCurrentDate(),
        requestStatus: 'pending'
    },
    {
        requestId: 103,
        requestTitle: `Lorem ipsum dolor`,
        requestDate: getCurrentDate(),
        requestStatus: 'rejected'
    },
    {
        requestId: 101,
        requestDate: getCurrentDate(),
        requestTitle: `Lorem ipsum dolor`,
        requestStatus: 'approved'
    },
    {
        requestId: 102,
        requestTitle: `Lorem ipsum dolor`,
        requestDate: getCurrentDate(),
        requestStatus: 'pending'
    },
    {
        requestId: 103,
        requestTitle: `Lorem ipsum dolor`,
        requestDate: getCurrentDate(),
        requestStatus: 'rejected'
    },
    {
        requestId: 101,
        requestDate: getCurrentDate(),
        requestTitle: `Lorem ipsum dolor`,
        requestStatus: 'approved'
    },
    {
        requestId: 102,
        requestTitle: `Lorem ipsum dolor`,
        requestDate: getCurrentDate(),
        requestStatus: 'pending'
    },
    {
        requestId: 103,
        requestTitle: `Lorem ipsum dolor`,
        requestDate: getCurrentDate(),
        requestStatus: 'rejected'
    }
]

export const dummyUsers: UserModel[] = [
    {
        userId: 1010,
        firstName: 'Michael',
        lastName: 'Townley',
        email: 'Michael@gmail.com',
        status: "allowed"
    },
    {
        userId: 102,
        firstName: 'Franklin',
        lastName: 'Clinton',
        email: 'Franklin@gmail.com',
        status: "restricted"
    },
    {
        userId: 103,
        firstName: 'Trevor',
        lastName: 'Philips',
        email: 'Trevor@gmail.com',
        status: "allowed"
    },
    {
        userId: 101,
        firstName: 'Michael',
        lastName: 'Townley',
        email: 'Michael@gmail.com',
        status: "allowed"
    },
    {
        userId: 102,
        firstName: 'Franklin',
        lastName: 'Clinton',
        email: 'Franklin@gmail.com',
        status: "restricted"
    },
    {
        userId: 103,
        firstName: 'Trevor',
        lastName: 'Philips',
        email: 'Trevor@gmail.com',
        status: "allowed"
    },
    {
        userId: 101,
        firstName: 'Michael',
        lastName: 'Townley',
        email: 'Michael@gmail.com',
        status: "allowed"
    },
    {
        userId: 102,
        firstName: 'Franklin',
        lastName: 'Clinton',
        email: 'Franklin@gmail.com',
        status: "restricted"
    },
    {
        userId: 103,
        firstName: 'Trevor',
        lastName: 'Philips',
        email: 'Trevor@gmail.com',
        status: "allowed"
    },
    {
        userId: 101,
        firstName: 'Michael',
        lastName: 'Townley',
        email: 'Michael@gmail.com',
        status: "allowed"
    },
    {
        userId: 102,
        firstName: 'Franklin',
        lastName: 'Clinton',
        email: 'Franklin@gmail.com',
        status: "restricted"
    },
    {
        userId: 103,
        firstName: 'Trevor',
        lastName: 'Philips',
        email: 'Trevor@gmail.com',
        status: "allowed"
    },
    {
        userId: 101,
        firstName: 'Michael',
        lastName: 'Townley',
        email: 'Michael@gmail.com',
        status: "allowed"
    },
    {
        userId: 102,
        firstName: 'Franklin',
        lastName: 'Clinton',
        email: 'Franklin@gmail.com',
        status: "restricted"
    },
    {
        userId: 103,
        firstName: 'Trevor',
        lastName: 'Philips',
        email: 'Trevor@gmail.com',
        status: "allowed"
    }
]

export const dummyRequest: UserRequestAdmin[] = [
    {
        requestId: 1,
        userId: 101,
        title: "some important request title",
        priority: "medium",
        status: "pending"
    },
    {
        requestId: 2,
        userId: 101,
        title: "some important request title",
        priority: "medium",
        status: "pending"
    },
    {
        requestId: 3,
        userId: 101,
        title: "some important request title",
        priority: "medium",
        status: "pending"
    },
    {
        requestId: 4,
        userId: 101,
        title: "some important request title",
        priority: "medium",
        status: "pending"
    },
    {
        requestId: 5,
        userId: 101,
        title: "some important request title",
        priority: "medium",
        status: "pending"
    },
    {
        requestId: 6,
        userId: 101,
        title: "some important request title",
        priority: "medium",
        status: "pending"
    },
    {
        requestId: 7,
        userId: 101,
        title: "some important request title",
        priority: "medium",
        status: "pending"
    },
    {
        requestId: 8,
        userId: 101,
        title: "some important request title",
        priority: "medium",
        status: "pending"
    },
    {
        requestId: 9,
        userId: 101,
        title: "some important request title",
        priority: "medium",
        status: "pending"
    },
    {
        requestId: 10,
        userId: 101,
        title: "some important request title",
        priority: "medium",
        status: "pending"
    },
    {
        requestId: 11,
        userId: 101,
        title: "some important request title",
        priority: "medium",
        status: "pending"
    },
    {
        requestId: 12,
        userId: 101,
        title: "some important request title",
        priority: "medium",
        status: "pending"
    }
]