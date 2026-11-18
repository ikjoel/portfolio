<?php

namespace App\Services;

use App\Models\AcademicSession;
use App\Models\GradingSystem;
use App\Models\School;
use App\Models\SchoolClass;
use App\Models\ScoreDivision;
use App\Models\Staff;
use App\Models\Student;
use App\Models\Subject;

/**
 * The first-time setup of a school, in the order that is easiest for a new admin: classes first, then the students
 * (what they came to do), then subjects and teachers, then the two "rules" (how grades are given and how a subject's
 * marks are split). One list used by the dashboard's Get Started card, the setup wizard banner, the wizard's own
 * "where to next" and the sidebar, so they can never disagree about what is done and what comes next.
 */
class SetupProgress
{
    /** @return array{steps: array<string, array>, done: int, total: int, percent: int, next: ?array, incomplete: bool, minutesLeft: int} */
    public function forSchool(School $school): array
    {
        $id = $school->id;
        $url = fn (string $route) => route($route, ['subdomain' => $school->subdomain, 'wizard' => 1]);

        $steps = [
            'classes' => [
                'label' => 'Classes & Arms', 'title' => 'Add your classes', 'route' => 'tenant.academics.classes', 'minutes' => 2,
                'explain' => 'Add the classes your school has, such as Primary 1 or JSS 2. If a class has sections (A, B, C), add them as arms.',
                'done' => SchoolClass::where('school_id', $id)->exists(),
            ],
            'students' => [
                'label' => 'Students', 'title' => 'Add your students', 'route' => 'tenant.people.students', 'minutes' => 5,
                'explain' => 'Add your students one by one, or upload a whole class from a spreadsheet. Each parent gets a login automatically.',
                'done' => Student::where('school_id', $id)->exists(),
            ],
            'subjects' => [
                'label' => 'Subjects', 'title' => 'Add your subjects', 'route' => 'tenant.academics.subjects.create', 'minutes' => 3,
                'explain' => 'Add the subjects each class studies. You can add many at once, and assign them to teachers later.',
                'done' => Subject::where('school_id', $id)->exists(),
            ],
            'staff' => [
                'label' => 'Teachers', 'title' => 'Add your teachers', 'route' => 'tenant.people.staff.create', 'minutes' => 3,
                'explain' => 'Add your teachers and give each a login. Tick the subjects they teach so they see them when they sign in.',
                'done' => Staff::where('school_id', $id)->exists(),
            ],
            'grading' => [
                'label' => 'Grading', 'title' => 'Choose how grades are given', 'route' => 'tenant.academics.grading', 'minutes' => 1,
                'explain' => 'Pick a ready-made scale (such as A1 to F9) with one click, or set your own. Report cards use it to show a grade.',
                'done' => GradingSystem::where('school_id', $id)->exists(),
            ],
            'divisions' => [
                'label' => 'Score split', 'title' => 'Choose how scores are split', 'route' => 'tenant.results.score-divisions', 'minutes' => 1,
                'explain' => 'Pick how each subject is scored, for example CA 30 and Exam 70 (together they make 100), or set your own.',
                'done' => ScoreDivision::where('school_id', $id)->exists(),
            ],
            'sessions' => [
                'label' => 'Session & Terms', 'title' => 'Set your session and terms', 'route' => 'tenant.academics.sessions_terms', 'minutes' => 1,
                'explain' => 'Create the school year (for example 2026/2027) with its terms, and mark the current one. Scores and fees are recorded against it.',
                'done' => AcademicSession::where('school_id', $id)->exists(),
            ],
        ];

        $next = null;
        $done = 0;
        $minutesLeft = 0;
        foreach ($steps as $key => &$step) {
            $step['key'] = $key;
            $step['url'] = $url($step['route']);
            if ($step['done']) {
                $done++;
            } else {
                $minutesLeft += $step['minutes'];
                $next = $next ?? $step;
            }
        }
        unset($step);

        $total = count($steps);

        return [
            'steps' => $steps,
            'done' => $done,
            'total' => $total,
            'percent' => (int) round($done / $total * 100),
            'next' => $next,
            'incomplete' => $next !== null,
            'minutesLeft' => $minutesLeft,
        ];
    }

    public function incomplete(School $school): bool
    {
        return $this->forSchool($school)['incomplete'];
    }
}
