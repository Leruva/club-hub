const mongoose = require('mongoose');

const clubMemberSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    club: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Club",
        required: true
    },

    role: {
        type: String,
        enum: [
            "president",
            "vicePresident",
            "coordinator",
            "treasurer",
            "volunteer",
            "member"
        ],
        default: "member"
    },

    permissions: {
        canManageEvents: {
            type: Boolean,
            default: false
        },

        canManageMembers: {
            type: Boolean,
            default: false
        },

        canPostAnnouncements: {
            type: Boolean,
            default: false
        },

        canScanAttendance: {
            type: Boolean,
            default: false
        }
    },

    joinedAt: {
        type: Date,
        default: Date.now
    }

}, { timestamps: true });

module.exports = mongoose.model("ClubMember", clubMemberSchema);