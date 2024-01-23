const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <h4>total of {sum} exercises</h4>

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}


const Content = ({ parts }) => {
  return (
    <>
      {
        parts.map((part) =>
          <Part key={part.id} part={part} />
        )}
    </>
  )
}


const Course = ({ course }) => {
    console.log("course");
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={course.parts.reduce((s , p) => s + p.exercises, 0)} />
    </>
  )
}

export default Course;