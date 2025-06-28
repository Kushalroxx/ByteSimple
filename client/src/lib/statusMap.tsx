import { AiOutlineCheckCircle, AiOutlineClockCircle, AiOutlineCloseCircle, AiOutlineLoading3Quarters } from 'react-icons/ai';
import { MdCurrencyRuble, MdOutlineAssignment, MdOutlineVerified } from 'react-icons/md';
import { BsStars } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';

export const statusMap = {
  pending: {
    label: "Pending",
    icon: <AiOutlineClockCircle className="mr-1" />,
    color: " text-yellow-400",
  },
  reviewed: {
    label: "Reviewed",
    icon: <MdOutlineAssignment className="mr-1" />,
    color: " text-purple-400",
  },
  quoted: {
    label: "Quoted",
    icon: <MdCurrencyRuble className="mr-1" />,
    color: " text-indigo-400",
  },
  "client-countered": {
    label: "Client Countered",
    icon: <FaEdit className="mr-1" />,
    color: " text-orange-400",
  },
  "final-countered": {
    label: "Final Countered",
    icon: <BsStars className="mr-1" />,
    color: " text-amber-400",
  },
  approved: {
    label: "Approved",
    icon: <MdOutlineVerified className="mr-1" />,
    color: " text-blue-400",
  },
  "in-progress": {
    label: "In Progress",
    icon: <AiOutlineLoading3Quarters className="mr-1 animate-spin-slow" />,
    color: " text-cyan-400",
  },
  completed: {
    label: "Completed",
    icon: <AiOutlineCheckCircle className="mr-1" />,
    color: " text-green-400",
  },
  cancelled: {
    label: "Cancelled",
    icon: <AiOutlineCloseCircle className="mr-1" />,
    color: " text-red-400",
  },
};
