export const load = () => {
    const boards:Board[] = [
      {
        name: "Platform Launch",
        id: "b_0",
        columns: [
          {
            name: "Todo",
            id: "c_0",
            tasks: [
              {
                name: "Build UI for onboarding flow",
                description: "This task involves creating the user interface for the onboarding flow, which includes designing and implementing pages for signing up, signing in, and the welcome page.",
                subtasks: [
                  {
                    name: "Sign up page",
                    done: true,
                    id: "s_0",
                  },
                  {
                    name: "Sign in page",
                    done: false,
                    id: "s_1",
                  },
                  {
                    name: "Welcome page",
                    done: false,
                    id: "s_2",
                  },
                ],
                status: {
                  id: "c_0",
                  name: "Todo",
                },
                id: "t_0",
              },
            ],
          },
          {
            name: "Development",
            id: "c_1",
            tasks: [
              {
                name: "Implement user authentication",
                description: "This task involves setting up user authentication functionality, including creating an authentication API and integrating it with the UI.",
                subtasks: [
                  {
                    name: "Set up authentication API",
                    done: false,
                    id: "s_3",
                  },
                  {
                    name: "Integrate authentication with UI",
                    done: false,
                    id: "s_4",
                  },
                ],
                status: {
                  id: "c_1",
                  name: "Development",
                },
                id: "t_1",
              },
              {
                name: "Create user profile management system",
                description: "This task involves developing a system for users to manage their profiles, including designing the profile UI, implementing profile editing functionality, and ensuring data security.",
                subtasks: [
                  {
                    name: "Design profile UI",
                    done: false,
                    id: "s_5",
                  },
                  {
                    name: "Implement profile editing functionality",
                    done: false,
                    id: "s_6",
                  },
                  {
                    name: "Ensure data encryption for sensitive information",
                    done: false,
                    id: "s_7",
                  },
                ],
                status: {
                  id: "c_1",
                  name: "Development",
                },
                id: "t_2",
              },
            ],
          },
          {
            name: "Testing",
            id: "c_2",
            tasks: [
              {
                name: "Perform UI/UX testing",
                description: "This task involves testing the user interface and user experience of the application across various devices to ensure responsiveness, usability, and accessibility.",
                subtasks: [
                  {
                    name: "Test responsiveness across devices",
                    done: false,
                    id: "s_8",
                  },
                  {
                    name: "Check usability and accessibility",
                    done: false,
                    id: "s_9",
                  },
                ],
                status: {
                  id: "c_2",
                  name: "Testing",
                },
                id: "t_3",
              },
              {
                name: "Conduct security testing",
                description: "This task involves testing the application's security measures through penetration testing and vulnerability scanning to identify and mitigate potential security risks.",
                subtasks: [
                  {
                    name: "Penetration testing",
                    done: false,
                    id: "s_10",
                  },
                  {
                    name: "Vulnerability scanning",
                    done: false,
                    id: "s_11",
                  },
                ],
                status: {
                  id: "c_2",
                  name: "Testing",
                },
                id: "t_4",
              },
            ],
          },
        ],
      },
      {
        name: "Marketing Plan",
        id: "b_1",
        columns: [
          {
            name: "Research",
            id: "c_3",
            tasks: [
              {
                name: "Analyze target audience demographics",
                description: "This task involves gathering data on the demographics of the target audience through surveys, interviews, and market research to better understand their characteristics and preferences.",
                subtasks: [
                  {
                    name: "Gather data on age, gender, location, etc.",
                    done: false,
                    id: "s_12",
                  },
                  {
                    name: "Conduct surveys or interviews",
                    done: false,
                    id: "s_13",
                  },
                ],
                status: {
                  id: "c_3",
                  name: "Research",
                },
                id: "t_5",
              },
              {
                name: "Identify key competitors",
                description: "This task involves researching and analyzing the products, marketing strategies, and strengths and weaknesses of key competitors in the market.",
                subtasks: [
                  {
                    name: "Research competitor products and marketing strategies",
                    done: false,
                    id: "s_14",
                  },
                  {
                    name: "Analyze competitor strengths and weaknesses",
                    done: false,
                    id: "s_15",
                  },
                ],
                status: {
                  id: "c_3",
                  name: "Research",
                },
                id: "t_6",
              },
            ],
          },
          {
            name: "Strategy",
            id: "c_4",
            tasks: [
              {
                name: "Develop marketing personas",
                description: "This task involves creating fictional profiles representing different segments of the target audience, based on demographics, behaviors, and preferences.",
                subtasks: [
                  {
                    name: "Create fictional profiles representing target customers",
                    done: false,
                    id: "s_16",
                  },
                  {
                    name: "Define their needs, preferences, and pain points",
                    done: false,
                    id: "s_17",
                  },
                ],
                status: {
                  id: "c_4",
                  name: "Strategy",
                },
                id: "t_7",
              },
              {
                name: "Craft messaging framework",
                description: "This task involves defining the brand's voice, tone, and key messages to effectively communicate with the target audience and differentiate from competitors.",
                subtasks: [
                  {
                    name: "Determine brand voice and tone",
                    done: false,
                    id: "s_18",
                  },
                  {
                    name: "Draft key messages for different audience segments",
                    done: false,
                    id: "s_19",
                  },
                ],
                status: {
                  id: "c_4",
                  name: "Strategy",
                },
                id: "t_8",
              },
            ],
          },
        ],
      },
      {
        name: "Roadmap",
        id: "b_2",
        columns: [
          {
            name: "Planning",
            id: "c_5",
            tasks: [
              {
                name: "Define project milestones",
                description: "This task involves identifying key milestones for the project, such as the launch date and feature release schedule, to track progress and ensure timely delivery.",
                subtasks: [
                  {
                    name: "Set launch date",
                    done: false,
                    id: "s_20",
                  },
                  {
                    name: "Determine feature release schedule",
                    done: false,
                    id: "s_21",
                  },
                ],
                status: {
                  id: "c_5",
                  name: "Planning",
                },
                id: "t_9",
              },
              {
                name: "Establish resource allocation plan",
                description: "This task involves allocating resources such as team members and budget to different tasks and activities to support the project's execution.",
                subtasks: [
                  {
                    name: "Assign team members to specific tasks",
                    done: false,
                    id: "s_22",
                  },
                  {
                    name: "Allocate budget for development, marketing, etc.",
                    done: false,
                    id: "s_23",
                  },
                ],
                status: {
                  id: "c_5",
                  name: "Planning",
                },
                id: "t_10",
              },
            ],
          },
          {
            name: "Execution",
            id: "c_6",
            tasks: [
              {
                name: "Develop minimum viable product (MVP)",
                description: "This task involves building the minimum viable product (MVP) with essential features to test the market and gather feedback for further iterations.",
                subtasks: [
                  {
                    name: "Identify core features",
                    done: false,
                    id: "s_24",
                  },
                  {
                    name: "Build and test MVP functionality",
                    done: false,
                    id: "s_25",
                  },
                ],
                status: {
                  id: "c_6",
                  name: "Execution",
                },
                id: "t_11",
              },
              {
                name: "Conduct beta testing",
                description: "This task involves recruiting beta testers to evaluate the MVP and provide feedback for improvements before the full launch.",
                subtasks: [
                  {
                    name: "Recruit beta testers",
                    done: false,
                    id: "s_26",
                  },
                  {
                    name: "Collect and analyze feedback",
                    done: false,
                    id: "s_27",
                  },
                ],
                status: {
                  id: "c_6",
                  name: "Execution",
                },
                id: "t_12",
              },
            ],
          },
          {
            name: "Review",
            id: "c_7",
            tasks: [
              {
                name: "Evaluate project progress",
                description: "This task involves assessing the progress of the project against the defined milestones and identifying any potential risks or delays.",
                subtasks: [
                  {
                    name: "Assess achieved milestones",
                    done: false,
                    id: "s_28",
                  },
                  {
                    name: "Identify potential risks or delays",
                    done: false,
                    id: "s_29",
                  },
                ],
                status: {
                  id: "c_7",
                  name: "Review",
                },
                id: "t_13",
              },
              {
                name: "Adjust roadmap if necessary",
                description: "This task involves reviewing the project's progress and feedback, and making necessary adjustments to the roadmap, timelines, or resource allocation.",
                subtasks: [
                  {
                    name: "Revise timelines or resource allocation",
                    done: false,
                    id: "s_30",
                  },
                  {
                    name: "Adapt strategies based on feedback and market conditions",
                    done: false,
                    id: "s_31",
                  },
                ],
                status: {
                  id: "c_7",
                  name: "Review",
                },
                id: "t_14",
              },
            ],
          },
        ],
      },
    ];
  return {
    // boards: [
    //   {
    //     name: "Platform Launch",
    //     id: 0,
    //     columns: [
    //       {
    //         name: "Todo",
    //         tasks: [
    //           {
    //             name: "Build UI for onboarding flow",
    //             subtasks: [
    //               {
    //                 name: "Sign up page",
    //                 done: true,
    //               },
    //               {
    //                 name: "Sign in page",
    //                 done: false,
    //               },
    //               {
    //                 name: "Welcome page",
    //                 done: false,
    //               },
    //             ],
    //             status: "Todo",
    //             id: 0,
    //           },
    //         ],
    //         id: 0,
    //       },
    //     ],
    //   },
    //   {
    //     name: "Marketing Plan",
    //     id: 1,
    //   },
    //   {
    //     name: "Roadmap",
    //     id: 3,
    //   },
    // ],
    boards,
  };
};
