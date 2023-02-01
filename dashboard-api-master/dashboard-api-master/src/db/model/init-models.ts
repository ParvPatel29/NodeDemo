import type { Sequelize } from 'sequelize'
import { kt_GESMember as _kt_GESMember } from './kt_GESMember'
import type {
  kt_GESMemberAttributes,
  kt_GESMemberCreationAttributes,
} from './kt_GESMember'
import { kt_GESOffice as _kt_GESOffice } from './kt_GESOffice'
import type {
  kt_GESOfficeAttributes,
  kt_GESOfficeCreationAttributes,
} from './kt_GESOffice'
import { kt_GESOfficeStaff as _kt_GESOfficeStaff } from './kt_GESOfficeStaff'
import type {
  kt_GESOfficeStaffAttributes,
  kt_GESOfficeStaffCreationAttributes,
} from './kt_GESOfficeStaff'
import { kt_adminTeam as _kt_adminTeam } from './kt_adminTeam'
import type {
  kt_adminTeamAttributes,
  kt_adminTeamCreationAttributes,
} from './kt_adminTeam'
import { kt_area as _kt_area } from './kt_area'
import type { kt_areaAttributes, kt_areaCreationAttributes } from './kt_area'
import { kt_auth as _kt_auth } from './kt_auth'
import type { kt_authAttributes, kt_authCreationAttributes } from './kt_auth'
import { kt_book as _kt_book } from './kt_book'
import type { kt_bookAttributes, kt_bookCreationAttributes } from './kt_book'
import { kt_classRoom as _kt_classRoom } from './kt_classRoom'
import type {
  kt_classRoomAttributes,
  kt_classRoomCreationAttributes,
} from './kt_classRoom'
import { kt_parent as _kt_parent } from './kt_parent'
import type {
  kt_parentAttributes,
  kt_parentCreationAttributes,
} from './kt_parent'
import { kt_termlyScheme as _kt_termlyScheme } from './kt_termlyScheme'
import type {
  kt_termlySchemeAttributes,
  kt_termlySchemeCreationAttributes,
} from './kt_termlyScheme'
import { kt_yearlyScheme as _kt_yearlyScheme } from './kt_yearlyScheme'
import type {
  kt_yearlySchemeAttributes,
  kt_yearlySchemeCreationAttributes,
} from './kt_yearlyScheme'
import { kt_publisher as _kt_publisher } from './kt_publisher'
import type {
  kt_publisherAttributes,
  kt_publisherCreationAttributes,
} from './kt_publisher'
import { kt_contentCategory as _kt_contentCategory } from './kt_contentCategory'
import type {
  kt_contentCategoryAttributes,
  kt_contentCategoryCreationAttributes,
} from './kt_contentCategory'
import { kt_contentManagement as _kt_contentManagement } from './kt_contentManagement'
import type {
  kt_contentManagementAttributes,
  kt_contentManagementCreationAttributes,
} from './kt_contentManagement'
import { kt_contentTeam as _kt_contentTeam } from './kt_contentTeam'
import type {
  kt_contentTeamAttributes,
  kt_contentTeamCreationAttributes,
} from './kt_contentTeam'

import { kt_exam as _kt_exam } from './kt_exam'
import type { kt_examAttributes, kt_examCreationAttributes } from './kt_exam'

import { kt_notification as _kt_notification } from './kt_notification'
import type {
  kt_notificationAttributes,
  kt_notificationCreationAttributes,
} from './kt_notification'

import { kt_eventCalender as _kt_eventCalender } from './kt_eventCalender'
import type {
  kt_eventCalenderAttributes,
  kt_eventCalenderCreationAttributes,
} from './kt_eventCalender'

import { kt_examTimeTable as _kt_examTimeTable } from './kt_examTimeTable'
import type {
  kt_examTimeTableAttributes,
  kt_examTimeTableCreationAttributes,
} from './kt_examTimeTable'
import { kt_freelancerTeacher as _kt_freelancerTeacher } from './kt_freelancerTeacher'
import type {
  kt_freelancerTeacherAttributes,
  kt_freelancerTeacherCreationAttributes,
} from './kt_freelancerTeacher'
import { kt_genre as _kt_genre } from './kt_genre'
import type { kt_genreAttributes, kt_genreCreationAttributes } from './kt_genre'

import { kt_questionBank as _kt_questionBank } from './kt_questionBank'
import type {
  kt_questionBankAttributes,
  kt_questionBankCreationAttributes,
} from './kt_questionBank'
import { kt_review as _kt_review } from './kt_review'
import type {
  kt_reviewAttributes,
  kt_reviewCreationAttributes,
} from './kt_review'
import { kt_school as _kt_school } from './kt_school'
import type {
  kt_schoolAttributes,
  kt_schoolCreationAttributes,
} from './kt_school'
import { kt_schoolStaff as _kt_schoolStaff } from './kt_schoolStaff'
import type {
  kt_schoolStaffAttributes,
  kt_schoolStaffCreationAttributes,
} from './kt_schoolStaff'
import { kt_student as _kt_student } from './kt_student'
import type {
  kt_studentAttributes,
  kt_studentCreationAttributes,
} from './kt_student'
import { kt_studentAttendance as _kt_studentAttendance } from './kt_studentAttendance'
import type {
  kt_studentAttendanceAttributes,
  kt_studentAttendanceCreationAttributes,
} from './kt_studentAttendance'
import { kt_studentLibrary as _kt_studentLibrary } from './kt_studentLibrary'
import type {
  kt_studentLibraryAttributes,
  kt_studentLibraryCreationAttributes,
} from './kt_studentLibrary'
import { kt_studentsRemark as _kt_studentsRemark } from './kt_studentsRemark'
import type {
  kt_studentsRemarkAttributes,
  kt_studentsRemarkCreationAttributes,
} from './kt_studentsRemark'
import { kt_teacher as _kt_teacher } from './kt_teacher'
import type {
  kt_teacherAttributes,
  kt_teacherCreationAttributes,
} from './kt_teacher'
import { kt_teacherLesson as _kt_teacherLesson } from './kt_teacherLesson'
import type {
  kt_teacherLessonAttributes,
  kt_teacherLessonCreationAttributes,
} from './kt_teacherLesson'
import { kt_teamMember as _kt_teamMember } from './kt_teamMember'
import type {
  kt_teamMemberAttributes,
  kt_teamMemberCreationAttributes,
} from './kt_teamMember'
import { kt_trainingProgram as _kt_trainingProgram } from './kt_trainingProgram'
import type {
  kt_trainingProgramAttributes,
  kt_trainingProgramCreationAttributes,
} from './kt_trainingProgram'
import { kt_tutorManagement as _kt_tutorManagement } from './kt_tutorManagement'
import type {
  kt_tutorManagementAttributes,
  kt_tutorManagementCreationAttributes,
} from './kt_tutorManagement'
import { kt_teacherLibrary as _kt_teacherLibrary } from './kt_teacherLibrary'
import {
  kt_teacherLibraryAttributes,
  kt_teacherLibraryCreationAttributes,
} from './kt_teacherLibrary'
import { kt_weeklyLessonPlan as _kt_weeklyLessonPlan } from './kt_weeklyLessonPlan'
import {
  kt_weeklyLessonPlanAttributes,
  kt_weeklyLessonPlanCreationAttributes,
} from './kt_weeklyLessonPlan'

import { kt_liveSession as _kt_liveSession } from './kt_liveSession'
import {
  kt_liveSessionAttributes,
  kt_liveSessionCreationAttributes,
} from './kt_liveSession'

import { kt_assignment as _kt_assignment } from './kt_assignment'
import {
  kt_assignmentAttributes,
  kt_assignmentCreationAttributes,
} from './kt_assignment'
import { kt_assignmentQuestions as _kt_assignmentQuestions } from './kt_assignmentQuestions'
import {
  kt_assignmentQuestionsAttributes,
  kt_assignmentQuestionsCreationAttributes,
} from './kt_assignmentQuestions'

import { kt_sendMessage as _kt_sendMessage } from './kt_sendMessage'
import {
  kt_sendMessageAttributes,
  kt_sendMessageCreationAttributes,
} from './kt_sendMessage'

import { kt_trainingParticipants as _kt_trainingParticipants } from './kt_trainingParticipants'
import {
  kt_trainingParticipantsAttributes,
  kt_trainingParticipantsCreationAttributes,
} from './kt_trainingParticipants'

import { kt_pastPaper as _kt_pastPaper } from './kt_pastPaper'
import {
  kt_pastPaperAttributes,
  kt_pastPaperCreationAttributes,
} from './kt_pastPaper'

import { kt_pastQuestionPaper as _kt_pastQuestionPaper } from './kt_pastQuestionPaper'
import {
  kt_pastQuestionPaperAttributes,
  kt_pastQuestionPaperCreationAttributes,
} from './kt_pastQuestionPaper'

export {
  _kt_GESMember as kt_GESMember,
  _kt_GESOffice as kt_GESOffice,
  _kt_GESOfficeStaff as kt_GESOfficeStaff,
  _kt_adminTeam as kt_adminTeam,
  _kt_area as kt_area,
  _kt_auth as kt_auth,
  _kt_book as kt_book,
  _kt_classRoom as kt_classRoom,
  _kt_parent as kt_parent,
  _kt_termlyScheme as kt_termlyScheme,
  _kt_yearlyScheme as kt_yearlyScheme,
  _kt_publisher as kt_publisher,
  _kt_contentCategory as kt_contentCategory,
  _kt_contentManagement as kt_contentManagement,
  _kt_contentTeam as kt_contentTeam,
  _kt_exam as kt_exam,
  _kt_notification as kt_notification,
  _kt_eventCalender as kt_eventCalender,
  _kt_examTimeTable as kt_examTimeTable,
  _kt_freelancerTeacher as kt_freelancerTeacher,
  _kt_genre as kt_genre,
  _kt_questionBank as kt_questionBank,
  _kt_review as kt_review,
  _kt_school as kt_school,
  _kt_schoolStaff as kt_schoolStaff,
  _kt_student as kt_student,
  _kt_studentAttendance as kt_studentAttendance,
  _kt_studentLibrary as kt_studentLibrary,
  _kt_studentsRemark as kt_studentsRemark,
  _kt_teacher as kt_teacher,
  _kt_teacherLesson as kt_teacherLesson,
  _kt_teacherLibrary as kt_teacherLibrary,
  _kt_weeklyLessonPlan as kt_weeklyLessonPlan,
  _kt_liveSession as kt_liveSession,
  _kt_assignment as kt_assignment,
  _kt_assignmentQuestions as kt_assignmentQuestions,
  _kt_sendMessage as kt_sendMessage,
  _kt_teamMember as kt_teamMember,
  _kt_trainingProgram as kt_trainingProgram,
  _kt_tutorManagement as kt_tutorManagement,
  _kt_trainingParticipants as kt_trainingParticipants,
  _kt_pastPaper as kt_pastPaper,
  _kt_pastQuestionPaper as kt_pastQuestionPaper
}

export type {
  kt_GESMemberAttributes,
  kt_GESMemberCreationAttributes,
  kt_GESOfficeAttributes,
  kt_GESOfficeCreationAttributes,
  kt_GESOfficeStaffAttributes,
  kt_GESOfficeStaffCreationAttributes,
  kt_adminTeamAttributes,
  kt_adminTeamCreationAttributes,
  kt_areaAttributes,
  kt_areaCreationAttributes,
  kt_authAttributes,
  kt_authCreationAttributes,
  kt_bookAttributes,
  kt_bookCreationAttributes,
  kt_classRoomAttributes,
  kt_parentAttributes,
  kt_termlySchemeAttributes,
  kt_yearlySchemeAttributes,
  kt_yearlySchemeCreationAttributes,
  kt_termlySchemeCreationAttributes,
  kt_parentCreationAttributes,
  kt_publisherAttributes,
  kt_publisherCreationAttributes,
  kt_classRoomCreationAttributes,
  kt_contentCategoryAttributes,
  kt_contentCategoryCreationAttributes,
  kt_contentManagementAttributes,
  kt_contentManagementCreationAttributes,
  kt_contentTeamAttributes,
  kt_contentTeamCreationAttributes,
  kt_examAttributes,
  kt_notificationCreationAttributes,
  kt_notificationAttributes,
  kt_eventCalenderAttributes,
  kt_eventCalenderCreationAttributes,
  kt_examCreationAttributes,
  kt_examTimeTableAttributes,
  kt_examTimeTableCreationAttributes,
  kt_freelancerTeacherAttributes,
  kt_freelancerTeacherCreationAttributes,
  kt_genreAttributes,
  kt_genreCreationAttributes,
  kt_questionBankAttributes,
  kt_questionBankCreationAttributes,
  kt_reviewAttributes,
  kt_reviewCreationAttributes,
  kt_schoolAttributes,
  kt_schoolCreationAttributes,
  kt_schoolStaffAttributes,
  kt_schoolStaffCreationAttributes,
  kt_studentAttributes,
  kt_studentCreationAttributes,
  kt_studentAttendanceAttributes,
  kt_studentAttendanceCreationAttributes,
  kt_studentLibraryAttributes,
  kt_studentLibraryCreationAttributes,
  kt_studentsRemarkAttributes,
  kt_studentsRemarkCreationAttributes,
  kt_teacherAttributes,
  kt_teacherCreationAttributes,
  kt_teacherLessonAttributes,
  kt_teacherLessonCreationAttributes,
  kt_teamMemberAttributes,
  kt_teamMemberCreationAttributes,
  kt_trainingProgramAttributes,
  kt_trainingProgramCreationAttributes,
  kt_tutorManagementAttributes,
  kt_tutorManagementCreationAttributes,
  kt_teacherLibraryAttributes,
  kt_weeklyLessonPlanAttributes,
  kt_liveSessionAttributes,
  kt_liveSessionCreationAttributes,
  kt_weeklyLessonPlanCreationAttributes,
  kt_teacherLibraryCreationAttributes,
  kt_assignmentAttributes,
  kt_assignmentCreationAttributes,
  kt_assignmentQuestionsCreationAttributes,
  kt_assignmentQuestionsAttributes,
  kt_sendMessageAttributes,
  kt_sendMessageCreationAttributes,
  kt_trainingParticipantsAttributes,
  kt_trainingParticipantsCreationAttributes,
  kt_pastPaperAttributes,
  kt_pastPaperCreationAttributes,
  kt_pastQuestionPaperAttributes,
  kt_pastQuestionPaperCreationAttributes
}

export function initModels(sequelize: Sequelize) {
  const kt_genre = _kt_genre.initModel(sequelize)

  const kt_GESMember = _kt_GESMember.initModel(sequelize)
  const kt_teacherLibrary = _kt_teacherLibrary.initModel(sequelize)
  const kt_weeklyLessonPlan = _kt_weeklyLessonPlan.initModel(sequelize)
  const kt_liveSession = _kt_liveSession.initModel(sequelize)
  const kt_assignment =  _kt_assignment.initModel(sequelize)
  const kt_pastPaper =  _kt_pastPaper.initModel(sequelize)
  const kt_pastQuestionPaper =  _kt_pastQuestionPaper.initModel(sequelize)
  
  const kt_assignmentQuestions = _kt_assignmentQuestions.initModel(sequelize)
  const kt_sendMessage = _kt_sendMessage.initModel(sequelize)
  const kt_trainingParticipants = _kt_trainingParticipants.initModel(sequelize)
  const kt_GESOffice = _kt_GESOffice.initModel(sequelize)
  const kt_GESOfficeStaff = _kt_GESOfficeStaff.initModel(sequelize)
  const kt_adminTeam = _kt_adminTeam.initModel(sequelize)
  const kt_auth = _kt_auth.initModel(sequelize)
  const kt_area = _kt_area.initModel(sequelize)
  const kt_contentManagement = _kt_contentManagement.initModel(sequelize)
  const kt_contentTeam = _kt_contentTeam.initModel(sequelize)
  const kt_freelancerTeacher = _kt_freelancerTeacher.initModel(sequelize)
  const kt_school = _kt_school.initModel(sequelize)
  const kt_teacher = _kt_teacher.initModel(sequelize)
  const kt_classRoom = _kt_classRoom.initModel(sequelize)
  const kt_parent = _kt_parent.initModel(sequelize)
  const kt_termlyScheme = _kt_termlyScheme.initModel(sequelize)
  const kt_yearlyScheme = _kt_yearlyScheme.initModel(sequelize)

  const kt_publisher = _kt_publisher.initModel(sequelize)

  const kt_schoolStaff = _kt_schoolStaff.initModel(sequelize)
  const kt_student = _kt_student.initModel(sequelize)
  const kt_book = _kt_book.initModel(sequelize)
  const kt_teamMember = _kt_teamMember.initModel(sequelize)
  const kt_trainingProgram = _kt_trainingProgram.initModel(sequelize)
  const kt_tutorManagement = _kt_tutorManagement.initModel(sequelize)
  const kt_contentCategory = _kt_contentCategory.initModel(sequelize)
  const kt_studentLibrary = _kt_studentLibrary.initModel(sequelize)
  const kt_questionBank = _kt_questionBank.initModel(sequelize)
  const kt_studentsRemark = _kt_studentsRemark.initModel(sequelize)
  const kt_teacherLesson = _kt_teacherLesson.initModel(sequelize)
  const kt_exam = _kt_exam.initModel(sequelize)
  const kt_notification = _kt_notification.initModel(sequelize)
  const kt_eventCalender = _kt_eventCalender.initModel(sequelize)

  const kt_examTimeTable = _kt_examTimeTable.initModel(sequelize)
  const kt_review = _kt_review.initModel(sequelize)
  const kt_studentAttendance = _kt_studentAttendance.initModel(sequelize)

  kt_book.belongsToMany(kt_student, {
    as: 'sl_studentId_kt_students',
    through: kt_studentLibrary,
    foreignKey: 'sl_bookId',
    otherKey: 'sl_studentId',
  })
  kt_student.belongsToMany(kt_book, {
    as: 'sl_bookId_kt_books',
    through: kt_studentLibrary,
    foreignKey: 'sl_studentId',
    otherKey: 'sl_bookId',
  })
  kt_GESMember.belongsTo(kt_GESOffice, {
    as: 'gm_gesOffice',
    foreignKey: 'gm_gesOfficeId',
  })
  kt_GESOffice.hasMany(kt_GESMember, {
    as: 'kt_GESMembers',
    foreignKey: 'gm_gesOfficeId',
  })
  kt_GESOfficeStaff.belongsTo(kt_GESOffice, {
    as: 'gs_gesOffice',
    foreignKey: 'gs_gesOfficeId',
  })
  kt_GESOffice.hasMany(kt_GESOfficeStaff, {
    as: 'kt_GESOfficeStaffs',
    foreignKey: 'gs_gesOfficeId',
  })
  kt_area.belongsTo(kt_area, { as: 'ar_parent', foreignKey: 'ar_parentId' })
  kt_area.hasMany(kt_area, { as: 'kt_areas', foreignKey: 'ar_parentId' })
  kt_review.belongsTo(kt_book, { as: 'br_book', foreignKey: 'br_bookId' })
  kt_book.hasMany(kt_review, { as: 'kt_reviews', foreignKey: 'br_bookId' })
  kt_studentLibrary.belongsTo(kt_book, {
    as: 'sl_book',
    foreignKey: 'sl_bookId',
  })
  kt_book.hasMany(kt_studentLibrary, {
    as: 'kt_studentLibraries',
    foreignKey: 'sl_bookId',
  })
  kt_book.belongsToMany(kt_teacher, {
    as: 'tl_teacherId_kt_teachers',
    through: kt_teacherLibrary,
    foreignKey: 'tl_bookId',
    otherKey: 'tl_teacherId',
  })
  kt_teacher.belongsToMany(kt_book, {
    as: 'tl_bookId_kt_books',
    through: kt_teacherLibrary,
    foreignKey: 'tl_teacherId',
    otherKey: 'tl_bookId',
  })
  kt_teacherLibrary.belongsTo(kt_book, {
    as: 'tl_book',
    foreignKey: 'tl_bookId',
  })
  kt_book.hasMany(kt_teacherLibrary, {
    as: 'kt_teacherLibraries',
    foreignKey: 'tl_bookId',
  })
  kt_teacherLibrary.belongsTo(kt_teacher, {
    as: 'tl_teacher',
    foreignKey: 'tl_teacherId',
  })
  kt_teacher.hasMany(kt_teacherLibrary, {
    as: 'kt_teacherLibraries',
    foreignKey: 'tl_teacherId',
  })
  kt_trainingParticipants.belongsTo(kt_trainingProgram, {
    as: 'tps_trainingProgram',
    foreignKey: 'tps_tp_id',
  })
  kt_trainingProgram.hasMany(kt_trainingParticipants, {
    as: 'kt_trainingParticipantes',
    foreignKey: 'tps_tp_id',
  })
  kt_assignmentQuestions.belongsTo(kt_assignment, {
    as: 'aq_assignment',
    foreignKey: 'asn_id',
  })
  kt_assignment.hasMany(kt_assignmentQuestions, {
    as: 'kt_assignmentQuestions',
    foreignKey: 'asn_id',
  })
  // kt_examTimeTable.belongsTo(kt_classRoom, {
  //   as: 'et_class',
  //   foreignKey: 'et_classId',
  // })
  // kt_classRoom.hasMany(kt_examTimeTable, {
  //   as: 'kt_examTimeTables',
  //   foreignKey: 'et_classId',
  // })
  kt_questionBank.belongsTo(kt_classRoom, {
    as: 'qb_classRoom',
    foreignKey: 'qb_classRoomId',
  })
  kt_classRoom.hasMany(kt_questionBank, {
    as: 'kt_questionBanks',
    foreignKey: 'qb_classRoomId',
  })
  kt_student.belongsTo(kt_classRoom, {
    as: 'st_classRoom',
    foreignKey: 'st_classRoomId',
  })
  kt_classRoom.hasMany(kt_student, {
    as: 'kt_students',
    foreignKey: 'st_classRoomId',
  })

  // kt_teacher.belongsTo(kt_classRoom, {
  //   as: 'tc_classRoom',
  //   foreignKey: 'tc_classRoomId',
  // })
  // kt_classRoom.hasMany(kt_teacher, {
  //   as: 'kt_teachers',
  //   foreignKey: 'tc_classRoomId',
  // })

  kt_termlyScheme.belongsTo(kt_school, {
    as: 'tsc_school',
    foreignKey: 'sc_id',
  })
  kt_school.hasMany(kt_termlyScheme, {
    as: 'kt_termlyScheme',
    foreignKey: 'sc_id',
  })

  kt_weeklyLessonPlan.belongsTo(kt_school, {
    as: 'wlp_school',
    foreignKey: 'sc_id',
  })
  kt_school.hasMany(kt_weeklyLessonPlan, {
    as: 'kt_weeklyLessonPlan',
    foreignKey: 'sc_id',
  })

  kt_yearlyScheme.belongsTo(kt_school, {
    as: 'ysc_school',
    foreignKey: 'sc_id',
  })
  kt_school.hasMany(kt_yearlyScheme, {
    as: 'kt_yearlyScheme',
    foreignKey: 'sc_id',
  })

  kt_contentCategory.belongsTo(kt_contentCategory, {
    as: 'cc_parent',
    foreignKey: 'cc_parentId',
  })
  kt_contentCategory.hasMany(kt_contentCategory, {
    as: 'kt_contentCategories',
    foreignKey: 'cc_parentId',
  })
  kt_examTimeTable.belongsTo(kt_exam, {
    as: 'et_exam',
    foreignKey: 'et_examId',
  })
  kt_exam.hasMany(kt_examTimeTable, {
    as: 'kt_examTimeTables',
    foreignKey: 'et_examId',
  })
  kt_classRoom.belongsTo(kt_school, {
    as: 'cr_school',
    foreignKey: 'cr_schoolId',
  })
  kt_school.hasMany(kt_classRoom, {
    as: 'kt_classRooms',
    foreignKey: 'cr_schoolId',
  })
  kt_exam.belongsTo(kt_school, { as: 'ex_school', foreignKey: 'ex_schoolId' })
  kt_school.hasMany(kt_exam, { as: 'kt_exams', foreignKey: 'ex_schoolId' })
  kt_examTimeTable.belongsTo(kt_school, {
    as: 'et_school',
    foreignKey: 'et_schoolId',
  })
  kt_school.hasMany(kt_examTimeTable, {
    as: 'kt_examTimeTables',
    foreignKey: 'et_schoolId',
  })
  kt_questionBank.belongsTo(kt_school, {
    as: 'qb_school',
    foreignKey: 'qb_schoolId',
  })
  kt_school.hasMany(kt_questionBank, {
    as: 'kt_questionBanks',
    foreignKey: 'qb_schoolId',
  })
  kt_schoolStaff.belongsTo(kt_school, {
    as: 'ss_school',
    foreignKey: 'ss_schoolId',
  })
  kt_school.hasMany(kt_schoolStaff, {
    as: 'kt_schoolStaffs',
    foreignKey: 'ss_schoolId',
  })
  kt_student.belongsTo(kt_school, {
    as: 'st_school',
    foreignKey: 'st_schoolId',
  })
  kt_school.hasMany(kt_student, {
    as: 'kt_students',
    foreignKey: 'st_schoolId',
  })
  kt_studentAttendance.belongsTo(kt_school, {
    as: 'sa_school',
    foreignKey: 'sa_schoolId',
  })
  kt_school.hasMany(kt_studentAttendance, {
    as: 'kt_studentAttendances',
    foreignKey: 'sa_schoolId',
  })
  kt_studentsRemark.belongsTo(kt_school, {
    as: 'sr_school',
    foreignKey: 'sr_schoolId',
  })
  kt_school.hasMany(kt_studentsRemark, {
    as: 'kt_studentsRemarks',
    foreignKey: 'sr_schoolId',
  })
  kt_teacher.belongsTo(kt_school, {
    as: 'tc_school',
    foreignKey: 'tc_schoolId',
  })
  kt_school.hasMany(kt_teacher, {
    as: 'kt_teachers',
    foreignKey: 'tc_schoolId',
  })
  kt_teacherLesson.belongsTo(kt_school, {
    as: 'tl_school',
    foreignKey: 'tl_schoolId',
  })
  kt_school.hasMany(kt_teacherLesson, {
    as: 'kt_teacherLessons',
    foreignKey: 'tl_schoolId',
  })
  kt_review.belongsTo(kt_student, {
    as: 'br_student',
    foreignKey: 'br_studentId',
  })
  kt_student.hasMany(kt_review, {
    as: 'kt_reviews',
    foreignKey: 'br_studentId',
  })
  kt_studentAttendance.belongsTo(kt_student, {
    as: 'sa_student',
    foreignKey: 'sa_studentId',
  })
  kt_student.hasMany(kt_studentAttendance, {
    as: 'kt_studentAttendances',
    foreignKey: 'sa_studentId',
  })
  kt_studentLibrary.belongsTo(kt_student, {
    as: 'sl_student',
    foreignKey: 'sl_studentId',
  })
  kt_student.hasMany(kt_studentLibrary, {
    as: 'kt_studentLibraries',
    foreignKey: 'sl_studentId',
  })
  kt_studentsRemark.belongsTo(kt_student, {
    as: 'sr_student',
    foreignKey: 'sr_studentId',
  })
  kt_student.hasMany(kt_studentsRemark, {
    as: 'kt_studentsRemarks',
    foreignKey: 'sr_studentId',
  })
  kt_classRoom.belongsTo(kt_teacher, {
    as: 'cr_classTeacher',
    foreignKey: 'cr_classTeacherId',
  })
  kt_teacher.hasMany(kt_classRoom, {
    as: 'kt_classRooms',
    foreignKey: 'cr_classTeacherId',
  })
  kt_studentsRemark.belongsTo(kt_teacher, {
    as: 'sr_teacher',
    foreignKey: 'sr_teacherId',
  })
  kt_teacher.hasMany(kt_studentsRemark, {
    as: 'kt_studentsRemarks',
    foreignKey: 'sr_teacherId',
  })
  kt_teacherLesson.belongsTo(kt_teacher, {
    as: 'tl_teacher',
    foreignKey: 'tl_teacherId',
  })
  kt_teacher.hasMany(kt_teacherLesson, {
    as: 'kt_teacherLessons',
    foreignKey: 'tl_teacherId',
  })

  kt_pastQuestionPaper.belongsTo(kt_pastPaper, {
    as: 'pq_pastPaper',
    foreignKey: 'pp_id',
  })
  kt_pastPaper.hasMany(kt_pastQuestionPaper, {
    as: 'pp_id_kt_pastQuestionPaper',
    foreignKey: 'pp_id',
  })

  return {
    kt_GESMember: kt_GESMember,
    kt_GESOffice: kt_GESOffice,
    kt_GESOfficeStaff: kt_GESOfficeStaff,
    kt_adminTeam: kt_adminTeam,
    kt_area: kt_area,
    kt_auth: kt_auth,
    kt_book: kt_book,
    kt_classRoom: kt_classRoom,
    kt_publisher: kt_publisher,
    kt_parent: kt_parent,
    kt_teacherLibrary: kt_teacherLibrary,
    kt_weeklyLessonPlan: kt_weeklyLessonPlan,
    kt_liveSession: kt_liveSession,
    kt_assignment : kt_assignment,
    kt_pastPaper : kt_pastPaper,
    kt_pastQuestionPaper : kt_pastQuestionPaper,
    kt_assignmentQuestions : kt_assignmentQuestions,
    kt_trainingParticipants : kt_trainingParticipants,
    kt_sendMessage: kt_sendMessage,
    kt_termlyScheme: kt_termlyScheme,
    kt_yearlyScheme: kt_yearlyScheme,
    kt_contentCategory: kt_contentCategory,
    kt_contentManagement: kt_contentManagement,
    kt_contentTeam: kt_contentTeam,
    kt_exam: kt_exam,
    kt_notification: kt_notification,
    kt_eventCalender: kt_eventCalender,
    kt_examTimeTable: kt_examTimeTable,
    kt_freelancerTeacher: kt_freelancerTeacher,
    kt_genre: kt_genre,
    kt_questionBank: kt_questionBank,
    kt_review: kt_review,
    kt_school: kt_school,
    kt_schoolStaff: kt_schoolStaff,
    kt_student: kt_student,
    kt_studentAttendance: kt_studentAttendance,
    kt_studentLibrary: kt_studentLibrary,
    kt_studentsRemark: kt_studentsRemark,
    kt_teacher: kt_teacher,
    kt_teacherLesson: kt_teacherLesson,
    kt_teamMember: kt_teamMember,
    kt_trainingProgram: kt_trainingProgram,
    kt_tutorManagement: kt_tutorManagement,
  }
}
