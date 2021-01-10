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
  template = replacePlaceholders(template, "name", manager.getName());
  template = replacePlaceholders(template, "role", manager.getRole());
  template = replacePlaceholders(template, "email", manager.getEmail());
  template = replacePlaceholders(template, "id", manager.getId());
  template = replacePlaceholders(template, "officeNumber", manager.getOfficeNumber());
  return template;
};
const renderEngineer = engineer => {
  let template = fs.readFileSync(path.resolve(templateDirectory, "engineer.html"), "utf8");
  template = replacePlaceholders(template, "name", engineer.getName());
  template = replacePlaceholders(template, "role", engineer.getRole());
  template = replacePlaceholders(template, "email", engineer.getEmail());
  template = replacePlaceholders(template, "id", engineer.getId());
  template = replacePlaceholders(template, "github", engineer.getGithub());
  return template;
};

// For Intern
const renderIntern = intern => {
  let template = fs.readFileSync(path.resolve(templateDirectory, "intern.html"), "utf8");
  template = replacePlaceholders(template, "name", intern.getName());
  template = replacePlaceholders(template, "role", intern.getRole());
  template = replacePlaceholders(template, "email", intern.getEmail());
  template = replacePlaceholders(template, "id", intern.getId());
  template = replacePlaceholders(template, "school", intern.getSchool());
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