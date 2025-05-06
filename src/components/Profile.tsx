import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'

interface Consultant {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  bio: string
  profilePicture?: { url: string }
}

interface ProfileProps {
  consultant: Consultant
}

export default function Profile({ consultant }: ProfileProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">

      <Card className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6">
        {consultant.profilePicture && (
          <Image
            src={
              consultant.profilePicture &&
              (typeof consultant.profilePicture === 'string'
                ? consultant.profilePicture
                : consultant.profilePicture.url || '/default-image.jpg')
              }
            alt={`${consultant.firstName} ${consultant.lastName}`}
            width={500} // Default width
            height={500} // Default height
            className="w-24 h-24 rounded-full object-cover"
          />
        )}
        <div>
          <h2 className="text-xl font-semibold">
            {consultant.firstName} {consultant.lastName} . Jarvis Consulting
          </h2>
          <p className="text-muted-foreground">{consultant.bio}</p>
          <div className="mt-2 text-sm text-muted-foreground space-y-1">
            <p><strong>Email:</strong> {consultant.email}</p>
            <p><strong>Phone:</strong> {consultant.phoneNumber}</p>
          </div>
        </div>
      </Card>

      <Separator />

      <section>
        <h2 className="text-2xl font-semibold mb-4">Skills</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          <div>
            <h3 className="font-medium">Proficient</h3>
            <ul className="list-disc list-inside text-muted-foreground">
              <li>JavaScript</li>
              <li>React</li>
              <li>Next.js</li>
              <li>HTML/CSS</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium">Competent</h3>
            <ul className="list-disc list-inside text-muted-foreground">
              <li>TypeScript</li>
              <li>Vue.js</li>
              <li>Tailwind CSS</li>
              <li>Node.js</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium">Familiar</h3>
            <ul className="list-disc list-inside text-muted-foreground">
              <li>GraphQL</li>
              <li>Docker</li>
              <li>Jest</li>
              <li>Python</li>
            </ul>
          </div>
        </div>
      </section>
      <Separator />

      <section>
        <h2 className="text-2xl font-semibold mb-4">Jarvis Projects</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">Stock Quote App</h3>
              <p className="text-sm text-muted-foreground">
                Implemented a Java Stock Quote command-line application that allows users to
                simulate a personal stock wallet. Integrated an external API into the application to
                fetch real-time stock data, ensuring up-to-date information. Technologies utilized
                in this project include JDBC for database interactions, PostgreSQL for the database
                management system, Maven for application dependency management and project building,
                and Docker for containerization and distribution. The application was thoroughly
                tested using JUnit and Mockito through various unit and integration tests.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">Cluster Monitor</h3>
              <p className="text-sm text-muted-foreground">
                Developed a cluster administration system using bash scripts to manage a 10-node
                Rocky Linux 9 cluster interconnected via a network switch with internal IPv4
                addresses. The system collects and stores cluster specifications and resource usage
                in a PostgreSQL database for future resource planning. The system was implemented
                with Docker containerization to ensure functionality across cluster machines.
                Development was tracked with Git and source code is stored on GitHub. Cron jobs were
                utilized to facilitate real-time monitoring.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
      <Separator />

      <section>
        <h2 className="text-2xl font-semibold mb-4">Highlighted Projects</h2>
        <Card>
          <CardContent className="p-4 space-y-2">
            <h3 className="font-medium">Trading Dashboard</h3>
            <p className="text-sm text-muted-foreground">
              Built a full-stack trading dashboard with real-time charts, WebSocket integration, and
              user authentication.
            </p>
          </CardContent>
        </Card>
      </section>
      <Separator />

      <section>
        <h2 className="text-2xl font-semibold mb-4">Professional Experiences</h2>
        <div className="space-y-2 text-muted-foreground">
          <div>
            <p className="font-medium text-foreground">
              Technical Consultant @ Jarvis Consulting Group
            </p>
            <p className="text-sm">Jan 2023 - Present</p>
            <p className="text-sm">
              Developed Java-based applications, managed SQL databases, and optimized performance
              using Linux/bash.
            </p>
          </div>
          <div>
            <p className="font-medium text-foreground">Web Intern @ Startup Inc.</p>
            <p className="text-sm">Jun 2022 - Dec 2022</p>
            <p className="text-sm">
              Developed reusable UI components and contributed to mobile responsiveness.
            </p>
          </div>
        </div>
      </section>
      <Separator />

      <section>
        <h2 className="text-2xl font-semibold mb-4">Education</h2>
        <p className="text-muted-foreground">
          B.Sc. in Computer Science – University of XYZ (2019–2023)
        </p>
      </section>
      <Separator />

      <section>
        <h2 className="text-2xl font-semibold mb-4">Miscellaneous</h2>
        <ul className="list-disc list-inside text-muted-foreground">
          <li>Hackathon Winner @ DevCon 2023</li>
          <li>Contributor to Open Source (Next.js plugins)</li>
          <li>Tech Blogger on Medium</li>
        </ul>
      </section>
    </div>
  )
}
