const path = require("path");
const fs = require("fs");
const templateDirectory = path.resolve(__dirname, "../templates");
const render = teamMemberArr => {
  const htmlPages = [];
  htmlPages.push(...teamMemberArr
    .filter(employee => employee.getRole() === "Manager")
    .map(manager => renderManager(manager))
  );
  htmlPages.push(...teamMemberArr
    .filter(employee => employee.getRole() === "Engineer")
    .map(engineer => renderEngineer(engineer))
  );
  htmlPages.push(...teamMemberArr
    .filter(employee => employee.getRole() === "Intern")
    .map(intern => renderIntern(intern))  
  );
  return renderMain(htmlPages.join(""));
}

const renderManager = manager => {
  let template = fs.readFileSync(path.resolve(templateDirectory, "manager.html"), "utf8");
  template = replacePlaceholders(template, "name", manager.managerName());
  template = replacePlaceholders(template, "role", manager.getRole());
  template = replacePlaceholders(template, "email", manager.managerEmail());
  template = replacePlaceholders(template, "id", manager.managerId());
  template = replacePlaceholders(template, "officeNumber", manager.managerOfficeNumber());
  return template;
};
const renderEngineer = engineer => {
  let template = fs.readFileSync(path.resolve(templatesDir, "engineer.html"), "utf8");
  template = replacePlaceholders(template, "name", engineer.engineerName());
  template = replacePlaceholders(template, "role", engineer.getRole());
  template = replacePlaceholders(template, "email", engineer.engineerEmail());
  template = replacePlaceholders(template, "id", engineer.engineerId());
  template = replacePlaceholders(template, "github", engineer.engineerGithub());
  return template;
};

// For Intern
const renderIntern = intern => {
  let template = fs.readFileSync(path.resolve(templatesDir, "intern.html"), "utf8");
  template = replacePlaceholders(template, "name", intern.internName());
  template = replacePlaceholders(template, "role", intern.getRole());
  template = replacePlaceholders(template, "email", intern.internEmail());
  template = replacePlaceholders(template, "id", intern.internId());
  template = replacePlaceholders(template, "school", intern.internSchool());
  return template;
};

// Function that determines the destination of the repalacement values in each template.html file.
const renderMain = htmlPages => {
  const template = fs.readFileSync(path.resolve(templateDirectory, "page.html"), "utf8");
  return replacePlaceholders(template, "index", htmlPages);
};

// Function that replaces the placeholder values with the values entered.
const replacePlaceholders = (template, placeholder, value) => {
  const pattern = new RegExp("{{ " + placeholder + " }}", "gm");
  return template.replace(pattern, value);
};

module.exports = render